<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Hero;
use App\Helpers\ImageHelper;

class HeroController extends Controller
{
    public function index()
    {
        $hero = Hero::first();
        if (!$hero) return response()->json(null);
        return response()->json(array_merge($hero->toArray(), ['image_url' => $hero->image_url]));
    }

    public function update(Request $request)
    {
        $hero = Hero::firstOrNew([]);

        $hero->fill($request->only([
            'hero_style', 'title', 'title_line1', 'title_line2', 'badge',
            'subtitle', 'description', 'cta_text', 'cta_link',
            'secondary_cta_text', 'secondary_cta_link',
        ]));

        if ($request->hasFile('image')) {
            if ($hero->image) ImageHelper::delete($hero->image);
            $hero->image = ImageHelper::compress($request->file('image'), 'hero', 80);
        }

        $hero->save();

        $this->log('update_hero', 'Memperbarui Hero Section');

        return response()->json([
            'message' => 'Hero berhasil diperbarui.',
            'data' => array_merge($hero->toArray(), ['image_url' => $hero->image_url]),
        ]);
    }
}
