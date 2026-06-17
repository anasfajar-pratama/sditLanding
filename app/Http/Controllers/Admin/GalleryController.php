<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Gallery;
use App\Helpers\ImageHelper;

class GalleryController extends Controller
{
    public function index()
    {
        return response()->json(
            Gallery::orderBy('order')->get()
                ->map(fn($g) => array_merge($g->toArray(), ['image_url' => $g->image_url]))
        );
    }

    public function store(Request $request)
    {
        $request->validate(['image' => 'required|image|max:5120']);

        $maxOrder = Gallery::max('order') ?? 0;

        $data = [
            'title' => $request->title ?? '',
            'image' => ImageHelper::compress($request->file('image'), 'gallery', 80),
            'order' => $maxOrder + 1,
            'is_active' => true,
        ];

        $gallery = Gallery::create($data);

        $this->logStore('galeri', $gallery->title ?: "Foto #{$gallery->order}");

        return response()->json([
            'message' => 'Gambar berhasil ditambahkan.',
            'data' => array_merge($gallery->toArray(), ['image_url' => $gallery->image_url]),
        ], 201);
    }

    public function update(Request $request, int $id)
    {
        $gallery = Gallery::findOrFail($id);
        $data = $request->only(['title', 'order', 'is_active']);

        if ($request->hasFile('image')) {
            ImageHelper::delete($gallery->image);
            $data['image'] = ImageHelper::compress($request->file('image'), 'gallery', 80);
        }

        $gallery->update($data);

        $this->logUpdate('galeri', $gallery->title ?: "Foto #{$gallery->order}");

        return response()->json([
            'message' => 'Berhasil diperbarui.',
            'data' => array_merge($gallery->toArray(), ['image_url' => $gallery->image_url]),
        ]);
    }

    public function toggle(int $id)
    {
        $gallery = Gallery::findOrFail($id);
        $gallery->update(['is_active' => !$gallery->is_active]);

        $this->log($gallery->is_active ? 'activate_galeri' : 'deactivate_galeri', ($gallery->title ?: "Foto #{$gallery->order}") . ' — ' . ($gallery->is_active ? 'ditampilkan' : 'disembunyikan'));

        return response()->json([
            'message' => 'Status diubah.',
            'data' => array_merge($gallery->toArray(), ['image_url' => $gallery->image_url]),
        ]);
    }

    public function destroy(int $id)
    {
        $gallery = Gallery::findOrFail($id);
        $title = $gallery->title ?: "Foto #{$gallery->order}";
        ImageHelper::delete($gallery->image);
        $gallery->delete();

        $this->logDelete('galeri', $title);

        return response()->json(['message' => 'Gambar berhasil dihapus.']);
    }
}
