<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Facility;
use App\Helpers\ImageHelper;

class FacilityController extends Controller
{
    public function index()
    {
        return response()->json(
            Facility::orderBy('order')->get()
                ->map(fn($f) => array_merge($f->toArray(), ['image_url' => $f->image_url]))
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:200',
            'type' => 'required|in:facility,eskul,kegiatan',
        ]);

        $data = $request->only(['name', 'type', 'description', 'icon']);
        $data['order'] = Facility::where('type', $request->type)->count() + 1;
        $data['is_active'] = true;

        if ($request->hasFile('image')) {
            $data['image'] = ImageHelper::compress($request->file('image'), 'facilities', 80);
        }

        $facility = Facility::create($data);

        return response()->json([
            'message' => ucfirst($request->type) . ' berhasil ditambahkan.',
            'data' => array_merge($facility->toArray(), ['image_url' => $facility->image_url]),
        ], 201);
    }

    public function update(Request $request, int $id)
    {
        $facility = Facility::findOrFail($id);

        $data = $request->only(['name', 'type', 'description', 'icon', 'order', 'is_active']);

        if ($request->hasFile('image')) {
            if ($facility->image) ImageHelper::delete($facility->image);
            $data['image'] = ImageHelper::compress($request->file('image'), 'facilities', 80);
        }

        $facility->update($data);

        return response()->json([
            'message' => 'Berhasil diperbarui.',
            'data' => array_merge($facility->toArray(), ['image_url' => $facility->image_url]),
        ]);
    }

    public function destroy(int $id)
    {
        $facility = Facility::findOrFail($id);
        if ($facility->image) ImageHelper::delete($facility->image);
        $facility->delete();
        return response()->json(['message' => 'Berhasil dihapus.']);
    }
}
