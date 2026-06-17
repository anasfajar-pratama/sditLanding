<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Testimonial;
use App\Helpers\ImageHelper;

class TestimonialController extends Controller
{
    public function index()
    {
        return response()->json(
            Testimonial::latest()->get()
                ->map(fn($t) => array_merge($t->toArray(), ['photo_url' => $t->photo_url]))
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:200',
            'content' => 'required|string',
        ]);

        $data = $request->only(['name', 'relation', 'content', 'rating']);
        $data['is_active'] = true;

        if ($request->hasFile('photo')) {
            $data['photo'] = ImageHelper::compress($request->file('photo'), 'testimonials', 80);
        }

        $testimonial = Testimonial::create($data);

        $this->logStore('testimoni', $testimonial->name);

        return response()->json([
            'message' => 'Testimoni berhasil ditambahkan.',
            'data' => array_merge($testimonial->toArray(), ['photo_url' => $testimonial->photo_url]),
        ], 201);
    }

    public function update(Request $request, int $id)
    {
        $testimonial = Testimonial::findOrFail($id);

        $data = $request->only(['name', 'relation', 'content', 'rating', 'is_active']);

        if ($request->hasFile('photo')) {
            if ($testimonial->photo) ImageHelper::delete($testimonial->photo);
            $data['photo'] = ImageHelper::compress($request->file('photo'), 'testimonials', 80);
        }

        $testimonial->update($data);

        $this->logUpdate('testimoni', $testimonial->name);

        return response()->json([
            'message' => 'Testimoni berhasil diperbarui.',
            'data' => array_merge($testimonial->toArray(), ['photo_url' => $testimonial->photo_url]),
        ]);
    }

    public function destroy(int $id)
    {
        $testimonial = Testimonial::findOrFail($id);
        $name = $testimonial->name;
        if ($testimonial->photo) ImageHelper::delete($testimonial->photo);
        $testimonial->delete();

        $this->logDelete('testimoni', $name);

        return response()->json(['message' => 'Testimoni berhasil dihapus.']);
    }
}
