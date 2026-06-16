<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ContactInfo;

class ContactController extends Controller
{
    public function index()
    {
        return response()->json(ContactInfo::getAllAsArray());
    }

    public function update(Request $request)
    {
        $fields = [
            'phone', 'phone_2', 'email', 'email_2',
            'address', 'postal_code',
            'operational_hours', 'map_iframe',
        ];

        foreach ($fields as $field) {
            if ($request->has($field)) {
                ContactInfo::set($field, $request->input($field));
            }
        }

        return response()->json([
            'message' => 'Kontak berhasil diperbarui.',
            'data' => ContactInfo::getAllAsArray(),
        ]);
    }
}
