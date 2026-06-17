<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Admin;
use App\Models\AdminActivityLog;

class AdminManagementController extends Controller
{
    public function index()
    {
        $admins = Admin::select('id', 'name', 'email', 'role', 'is_suspended', 'created_at')->get();

        return response()->json(['data' => $admins]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:200',
            'email' => 'required|email|max:200|unique:admins,email',
            'password' => 'required|string|min:6',
        ]);

        $admin = Admin::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
            'role' => 'operator',
        ]);

        AdminActivityLog::log(
            session('admin_id'),
            session('admin_name'),
            'create_admin',
            "Membuat admin baru: {$admin->name} ({$admin->email}) — sebagai operator"
        );

        return response()->json([
            'message' => 'Admin berhasil ditambahkan.',
            'data' => ['id' => $admin->id, 'name' => $admin->name, 'email' => $admin->email, 'role' => 'operator', 'is_suspended' => false],
        ], 201);
    }

    public function suspend(Request $request, int $id)
    {
        $currentAdmin = Admin::findOrFail(session('admin_id'));
        $admin = Admin::findOrFail($id);

        if (!$currentAdmin->isAdministrator()) {
            return response()->json(['message' => 'Hanya administrator yang dapat menonaktifkan akun.'], 403);
        }

        if ($admin->isAdministrator()) {
            return response()->json(['message' => 'Tidak dapat menonaktifkan akun administrator.'], 422);
        }

        if ($admin->id === $currentAdmin->id) {
            return response()->json(['message' => 'Tidak dapat menonaktifkan akun sendiri.'], 422);
        }

        $request->validate(['password' => 'required|string']);
        if (!$currentAdmin->checkPassword($request->password)) {
            return response()->json(['message' => 'Password administrator salah.'], 403);
        }

        $admin->update(['is_suspended' => true]);

        AdminActivityLog::log(
            $currentAdmin->id,
            $currentAdmin->name,
            'suspend_admin',
            "Menonaktifkan admin: {$admin->name} ({$admin->email})"
        );

        return response()->json(['message' => 'Admin berhasil dinonaktifkan.']);
    }

    public function unsuspend(Request $request, int $id)
    {
        $currentAdmin = Admin::findOrFail(session('admin_id'));
        $admin = Admin::findOrFail($id);

        if (!$currentAdmin->isAdministrator()) {
            return response()->json(['message' => 'Hanya administrator yang dapat mengaktifkan akun.'], 403);
        }

        $request->validate(['password' => 'required|string']);
        if (!$currentAdmin->checkPassword($request->password)) {
            return response()->json(['message' => 'Password administrator salah.'], 403);
        }

        $admin->update(['is_suspended' => false]);

        AdminActivityLog::log(
            $currentAdmin->id,
            $currentAdmin->name,
            'unsuspend_admin',
            "Mengaktifkan kembali admin: {$admin->name} ({$admin->email})"
        );

        return response()->json(['message' => 'Admin berhasil diaktifkan kembali.']);
    }

    public function destroy(Request $request, int $id)
    {
        $currentAdmin = Admin::findOrFail(session('admin_id'));
        $admin = Admin::findOrFail($id);

        if (!$currentAdmin->isAdministrator()) {
            return response()->json(['message' => 'Hanya administrator yang dapat menghapus akun.'], 403);
        }

        if ($admin->isAdministrator()) {
            return response()->json(['message' => 'Tidak dapat menghapus akun administrator.'], 422);
        }

        if ($admin->id === $currentAdmin->id) {
            return response()->json(['message' => 'Tidak dapat menghapus akun sendiri.'], 422);
        }

        $request->validate(['password' => 'required|string']);
        if (!$currentAdmin->checkPassword($request->password)) {
            return response()->json(['message' => 'Password administrator salah.'], 403);
        }

        $name = $admin->name;
        $email = $admin->email;
        $admin->delete();

        AdminActivityLog::log(
            $currentAdmin->id,
            $currentAdmin->name,
            'delete_admin',
            "Menghapus admin: {$name} ({$email})"
        );

        return response()->json(['message' => 'Admin berhasil dihapus.']);
    }
}
