<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    protected $fillable = ['name', 'position', 'education', 'photo', 'bio', 'order', 'is_active', 'is_featured'];

    protected $casts = ['order' => 'integer', 'is_active' => 'boolean'];

    public function getPhotoUrlAttribute(): ?string
    {
        return $this->photo ? asset($this->photo) : null;
    }
}
