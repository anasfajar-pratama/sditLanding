<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Setting;
use App\Helpers\ImageHelper;

class SettingController extends Controller
{
    public function index()
    {
        return response()->json(Setting::getAllAsArray());
    }

    public function update(Request $request)
    {
        $fields = [
            'school_name', 'tagline', 'whatsapp_number', 'address',
            'email', 'phone', 'facebook', 'instagram', 'youtube',
            'footer_description', 'copyright_text',
            'ppdb_link', 'ppdb_text',
            'map_iframe',
        ];

        foreach ($fields as $field) {
            if ($request->has($field)) {
                Setting::set($field, $request->input($field));
            }
        }

        // Handle logo upload
        if ($request->hasFile('logo')) {
            $old = Setting::get('logo');
            if ($old) ImageHelper::delete($old);
            $path = ImageHelper::compress($request->file('logo'), 'settings', 85);
            Setting::set('logo', $path);
        }

        if ($request->hasFile('logo_yayasan')) {
            $old = Setting::get('logo_yayasan');
            if ($old) ImageHelper::delete($old);
            $path = ImageHelper::compress($request->file('logo_yayasan'), 'settings', 85);
            Setting::set('logo_yayasan', $path);
        }

        if ($request->hasFile('favicon')) {
            $old = Setting::get('favicon');
            if ($old) ImageHelper::delete($old);
            $path = ImageHelper::compress($request->file('favicon'), 'settings', 85);
            Setting::set('favicon', $path);
        }

        return response()->json(['message' => 'Pengaturan berhasil disimpan.', 'data' => Setting::getAllAsArray()]);
    }
}
