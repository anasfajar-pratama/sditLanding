<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Admin;

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

        session(['admin_logged_in' => true, 'admin_id' => $admin->id, 'admin_name' => $admin->name]);

        return response()->json([
            'message' => 'Login berhasil.',
            'admin' => ['id' => $admin->id, 'name' => $admin->name, 'email' => $admin->email],
        ]);
    }

    public function logout(Request $request)
    {
        session()->forget(['admin_logged_in', 'admin_id', 'admin_name']);
        return response()->json(['message' => 'Logout berhasil.']);
    }

    public function me(Request $request)
    {
        if (!session('admin_logged_in')) {
            return response()->json(['authenticated' => false], 401);
        }
        $admin = Admin::find(session('admin_id'));
        return response()->json([
            'authenticated' => true,
            'admin' => $admin ? ['id' => $admin->id, 'name' => $admin->name, 'email' => $admin->email] : null,
        ]);
    }
}
