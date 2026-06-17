<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Admin;
use App\Models\AdminActivityLog;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $admin = Admin::where('email', $request->email)->first();

        if (!$admin || !$admin->checkPassword($request->password)) {
            return response()->json(['message' => 'Email atau password salah.'], 401);
        }

        if ($admin->is_suspended) {
            return response()->json(['message' => 'Akun Anda telah dinonaktifkan. Hubungi administrator.'], 403);
        }

        session(['admin_logged_in' => true, 'admin_id' => $admin->id, 'admin_name' => $admin->name]);

        AdminActivityLog::log($admin->id, $admin->name, 'login');

        return response()->json([
            'message' => 'Login berhasil.',
            'admin' => ['id' => $admin->id, 'name' => $admin->name, 'email' => $admin->email, 'role' => $admin->role],
        ]);
    }

    public function logout(Request $request)
    {
        $adminId = session('admin_id');
        $adminName = session('admin_name');

        session()->forget(['admin_logged_in', 'admin_id', 'admin_name']);

        if ($adminId && $adminName) {
            AdminActivityLog::log($adminId, $adminName, 'logout');
        }

        return response()->json(['message' => 'Logout berhasil.']);
    }

    public function me(Request $request)
    {
        if (!session('admin_logged_in')) {
            return response()->json(['authenticated' => false], 401);
        }
        $admin = Admin::find(session('admin_id'));
        if (!$admin || $admin->is_suspended) {
            session()->forget(['admin_logged_in', 'admin_id', 'admin_name']);
            return response()->json(['authenticated' => false, 'message' => 'Akun ditangguhkan.'], 403);
        }
        return response()->json([
            'authenticated' => true,
            'admin' => ['id' => $admin->id, 'name' => $admin->name, 'email' => $admin->email, 'role' => $admin->role],
        ]);
    }
}
