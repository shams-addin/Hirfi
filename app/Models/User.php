<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    protected $table = 'users';
    protected $primaryKey = 'user_id';
    protected $keyType = 'int';
    
    protected $fillable = [
        'first_name',
        'last_name',
        'age',
        'pass_key',
        'phone',
    ];

    protected $hidden = ['pass_key'];

    public function customer(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Customer::class, 'customer_id', 'user_id');
    }

    public function provider(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Provider::class, 'provider_id', 'user_id');
    }

    public function address(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(UserAddress::class, 'user_id', 'user_id');
    }

    protected function casts(): array
    {
        return [
            'age' => 'integer',
            'pass_key' => 'hashed',
        ];
    }
}
