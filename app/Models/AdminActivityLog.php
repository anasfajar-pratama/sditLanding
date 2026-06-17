<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdminActivityLog extends Model
{
    protected $fillable = ['admin_id', 'admin_name', 'action', 'details'];

    public function admin()
    {
        return $this->belongsTo(Admin::class);
    }

    public static function log(int $adminId, string $adminName, string $action, ?string $details = null): self
    {
        return static::create([
            'admin_id' => $adminId,
            'admin_name' => $adminName,
            'action' => $action,
            'details' => $details,
        ]);
    }
}
