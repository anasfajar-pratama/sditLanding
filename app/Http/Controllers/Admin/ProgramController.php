<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Program;
use App\Helpers\ImageHelper;

class ProgramController extends Controller
{
    public function index()
    {
        return response()->json(
            Program::orderBy('order')->get()
                ->map(fn($p) => array_merge($p->toArray(), ['image_url' => $p->image_url]))
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:200',
            'description' => 'required|string',
        ]);

        $data = $request->only(['title', 'description', 'icon']);
        $data['order'] = Program::count() + 1;
        $data['is_active'] = true;

        if ($request->hasFile('image')) {
            $data['image'] = ImageHelper::compress($request->file('image'), 'programs', 80);
        }

        $program = Program::create($data);

        return response()->json([
            'message' => 'Program berhasil ditambahkan.',
            'data' => array_merge($program->toArray(), ['image_url' => $program->image_url]),
        ], 201);
    }

    public function update(Request $request, int $id)
    {
        $program = Program::findOrFail($id);

        $data = $request->only(['title', 'description', 'icon', 'order', 'is_active']);

        if ($request->hasFile('image')) {
            if ($program->image) ImageHelper::delete($program->image);
            $data['image'] = ImageHelper::compress($request->file('image'), 'programs', 80);
        }

        $program->update($data);

        return response()->json([
            'message' => 'Program berhasil diperbarui.',
            'data' => array_merge($program->toArray(), ['image_url' => $program->image_url]),
        ]);
    }

    public function destroy(int $id)
    {
        $program = Program::findOrFail($id);
        if ($program->image) ImageHelper::delete($program->image);
        $program->delete();
        return response()->json(['message' => 'Program berhasil dihapus.']);
    }
}
