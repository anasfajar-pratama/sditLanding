<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;

class Admin extends Model
{
    protected $fillable = ['name', 'email', 'role', 'password', 'is_suspended'];
    protected $hidden = ['password'];

    protected $casts = ['is_suspended' => 'boolean'];

    public function setPasswordAttribute(string $value): void
    {
        $this->attributes['password'] = Hash::make($value);
    }

    public function checkPassword(string $password): bool
    {
        return Hash::check($password, $this->password);
    }

    public function isAdministrator(): bool
    {
        return $this->role === 'administrator';
    }
}
