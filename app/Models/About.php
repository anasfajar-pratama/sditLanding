<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class About extends Model
{
    protected $fillable = ['title', 'content', 'vision', 'mission'];

    public function images()
    {
        return $this->hasMany(AboutImage::class)->orderBy('order');
    }
}
