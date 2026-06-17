<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\About;
use App\Models\AboutImage;
use App\Helpers\ImageHelper;

class AboutController extends Controller
{
    public function index()
    {
        $about = About::with('images')->first();
        if (!$about) return response()->json(null);
        $data = $about->toArray();
        $data['images'] = $about->images->map(fn($img) => array_merge($img->toArray(), ['image_url' => $img->image_url]))->values()->toArray();
        return response()->json($data);
    }

    public function update(Request $request)
    {
        $about = About::firstOrNew([]);
        $about->fill($request->only(['title', 'content', 'vision', 'mission']));
        $about->save();

        $this->log('update_tentang', 'Memperbarui section Tentang Kami');

        return response()->json(['message' => 'Tentang berhasil diperbarui.', 'data' => $about]);
    }

    public function uploadImage(Request $request)
    {
        $request->validate(['image' => 'required|image|max:5120']);

        $about = About::firstOrCreate([]);

        $count = AboutImage::where('about_id', $about->id)->count();
        if ($count >= 8) {
            return response()->json(['message' => 'Maksimal 8 gambar.'], 422);
        }

        $path = ImageHelper::compress($request->file('image'), 'about', 80);

        $img = AboutImage::create([
            'about_id' => $about->id,
            'image' => $path,
            'caption' => $request->caption ?? '',
            'order' => $count + 1,
        ]);

        $this->log('upload_gambar_tentang', 'Menambahkan gambar section Tentang Kami');

        return response()->json([
            'message' => 'Gambar berhasil diupload.',
            'data' => array_merge($img->toArray(), ['image_url' => $img->image_url]),
        ], 201);
    }

    public function deleteImage(int $id)
    {
        $img = AboutImage::findOrFail($id);
        ImageHelper::delete($img->image);
        $img->delete();

        $this->log('delete_gambar_tentang', 'Menghapus gambar section Tentang Kami');

        return response()->json(['message' => 'Gambar berhasil dihapus.']);
    }
}
