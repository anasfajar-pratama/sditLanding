<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Facility extends Model
{
    // type: 'facility' | 'eskul' | 'kegiatan'
    protected $fillable = ['name', 'type', 'description', 'image', 'icon', 'order', 'is_active'];

    protected $casts = ['order' => 'integer', 'is_active' => 'boolean'];

    public function getImageUrlAttribute(): ?string
    {
        return $this->image ? asset($this->image) : null;
    }
}
