<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Stat extends Model
{
    protected $fillable = ['label', 'value', 'suffix', 'icon', 'order'];

    protected $casts = ['order' => 'integer'];
}
