<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\Admin;
use Symfony\Component\HttpFoundation\Response;

class AdminAuth
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!session('admin_logged_in')) {
            if ($request->expectsJson()) {
                return response()->json(['message' => 'Unauthenticated.'], 401);
            }
            return redirect('/admin/login');
        }

        $admin = Admin::find(session('admin_id'));
        if (!$admin || $admin->is_suspended) {
            session()->forget(['admin_logged_in', 'admin_id', 'admin_name']);
            if ($request->expectsJson()) {
                return response()->json(['message' => 'Akun ditangguhkan.'], 403);
            }
            return redirect('/admin/login');
        }

        return $next($request);
    }
}
