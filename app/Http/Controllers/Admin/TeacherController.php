<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Teacher;
use App\Helpers\ImageHelper;

class TeacherController extends Controller
{
    public function index()
    {
        return response()->json(
            Teacher::orderBy('order')->get()
                ->map(fn($t) => array_merge($t->toArray(), ['photo_url' => $t->photo_url]))
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:200',
            'position' => 'required|string|max:200',
        ]);

        $data = $request->only(['name', 'position', 'education', 'bio']);
        $data['order'] = Teacher::count() + 1;
        $data['is_active'] = true;
        $data['is_featured'] = filter_var($request->input('is_featured', false), FILTER_VALIDATE_BOOLEAN);

        if ($request->hasFile('photo')) {
            $data['photo'] = ImageHelper::compress($request->file('photo'), 'teachers', 80);
        }

        $teacher = Teacher::create($data);

        return response()->json([
            'message' => 'Guru berhasil ditambahkan.',
            'data' => array_merge($teacher->toArray(), ['photo_url' => $teacher->photo_url]),
        ], 201);
    }

    public function update(Request $request, int $id)
    {
        $teacher = Teacher::findOrFail($id);

        $data = $request->only(['name', 'position', 'education', 'bio', 'order', 'is_active', 'is_featured']);

        if ($request->hasFile('photo')) {
            if ($teacher->photo) ImageHelper::delete($teacher->photo);
            $data['photo'] = ImageHelper::compress($request->file('photo'), 'teachers', 80);
        }

        $teacher->update($data);

        return response()->json([
            'message' => 'Guru berhasil diperbarui.',
            'data' => array_merge($teacher->toArray(), ['photo_url' => $teacher->photo_url]),
        ]);
    }

    public function destroy(int $id)
    {
        $teacher = Teacher::findOrFail($id);
        if ($teacher->photo) ImageHelper::delete($teacher->photo);
        $teacher->delete();
        return response()->json(['message' => 'Guru berhasil dihapus.']);
    }
}
