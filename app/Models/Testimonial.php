<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    protected $fillable = ['name', 'relation', 'content', 'photo', 'rating', 'is_active'];

    protected $casts = ['rating' => 'integer', 'is_active' => 'boolean'];

    public function getPhotoUrlAttribute(): ?string
    {
        return $this->photo ? asset($this->photo) : null;
    }
}
