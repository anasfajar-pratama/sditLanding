<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Hero extends Model
{
    protected $fillable = [
        'hero_style', 'title', 'title_line1', 'title_line2', 'badge',
        'subtitle', 'description', 'image',
        'cta_text', 'cta_link', 'secondary_cta_text', 'secondary_cta_link',
    ];

    public function getImageUrlAttribute(): ?string
    {
        return $this->image ? asset($this->image) : null;
    }
}
