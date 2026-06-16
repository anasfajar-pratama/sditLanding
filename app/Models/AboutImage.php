<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AboutImage extends Model
{
    protected $fillable = ['about_id', 'image', 'caption', 'order'];

    protected $casts = ['order' => 'integer'];

    public function getImageUrlAttribute(): string
    {
        return asset($this->image);
    }
}
