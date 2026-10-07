<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Supervisor extends Model
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    protected $table = 'supervisors';
    protected $primaryKey = 'supervisor_id';
    
    protected $keyType = 'int';

    protected $fillable = [
        'first_name',
        'second_name',
        'last_name',
        'age',
        'pass_key',
        'auth',
        'phone',
    ];

    protected $hidden = ['pass_key'];

    public function category(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Category::class, 'supervisor_id', 'supervisor_id');
    }

    public function admin(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Supervisor::class, 'admin_id', 'supervisor_id');
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'age' => 'integer',
            'pass_key' => 'hashed',
        ];
    }
}
