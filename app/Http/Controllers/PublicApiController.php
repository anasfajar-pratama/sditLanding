<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Setting;
use App\Models\Hero;
use App\Models\Stat;
use App\Models\About;
use App\Models\Program;
use App\Models\Teacher;
use App\Models\Facility;
use App\Models\Testimonial;
use App\Models\ContactInfo;
use App\Models\Gallery;

class PublicApiController extends Controller
{
    public function all()
    {
        return response()->json([
            'settings' => Setting::getAllAsArray(),
            'hero' => $this->heroData(),
            'stats' => Stat::orderBy('order')->get(),
            'about' => $this->aboutData(),
            'programs' => Program::where('is_active', true)->orderBy('order')->get()->map(fn($p) => array_merge($p->toArray(), ['image_url' => $p->image_url])),
            'teachers' => Teacher::where('is_active', true)->orderBy('order')->get()->map(fn($t) => array_merge($t->toArray(), ['photo_url' => $t->photo_url])),
            'facilities' => Facility::where('is_active', true)->orderBy('order')->get()->map(fn($f) => array_merge($f->toArray(), ['image_url' => $f->image_url])),
            'testimonials' => Testimonial::where('is_active', true)->get()->map(fn($t) => array_merge($t->toArray(), ['photo_url' => $t->photo_url])),
            'contact' => ContactInfo::getAllAsArray(),
            'gallery' => Gallery::where('is_active', true)->where('image', '!=', '')->orderBy('order')->get()->map(fn($g) => array_merge($g->toArray(), ['image_url' => $g->image_url])),
        ]);
    }

    public function settings()
    {
        return response()->json(Setting::getAllAsArray());
    }

    public function hero()
    {
        return response()->json($this->heroData());
    }

    public function stats()
    {
        return response()->json(Stat::orderBy('order')->get());
    }

    public function about()
    {
        return response()->json($this->aboutData());
    }

    public function programs()
    {
        return response()->json(
            Program::where('is_active', true)->orderBy('order')->get()
                ->map(fn($p) => array_merge($p->toArray(), ['image_url' => $p->image_url]))
        );
    }

    public function teachers()
    {
        return response()->json(
            Teacher::where('is_active', true)->orderBy('order')->get()
                ->map(fn($t) => array_merge($t->toArray(), ['photo_url' => $t->photo_url]))
        );
    }

    public function facilities()
    {
        return response()->json(
            Facility::where('is_active', true)->orderBy('order')->get()
                ->map(fn($f) => array_merge($f->toArray(), ['image_url' => $f->image_url]))
        );
    }

    public function testimonials()
    {
        return response()->json(
            Testimonial::where('is_active', true)->get()
                ->map(fn($t) => array_merge($t->toArray(), ['photo_url' => $t->photo_url]))
        );
    }

    public function contact()
    {
        return response()->json(ContactInfo::getAllAsArray());
    }

    public function gallery()
    {
        return response()->json(
            Gallery::where('is_active', true)->where('image', '!=', '')->orderBy('order')->get()
                ->map(fn($g) => array_merge($g->toArray(), ['image_url' => $g->image_url]))
        );
    }

    private function heroData(): array
    {
        $hero = Hero::first();
        if (!$hero) return [];
        return array_merge($hero->toArray(), ['image_url' => $hero->image_url]);
    }

    private function aboutData(): array
    {
        $about = About::with('images')->first();
        if (!$about) return [];
        $data = $about->toArray();
        $data['images'] = $about->images->map(fn($img) => array_merge($img->toArray(), ['image_url' => $img->image_url]))->values()->toArray();
        return $data;
    }
}
