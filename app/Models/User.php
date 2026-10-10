<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

#[Table(key: 'user_id', timestamps: false)]
#[Fillable([
    'first_name',
    'last_name',
    'birth_date', 
    'pass_key', 
    'phone', 
    'address', 
    'nationality'
    ])
]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    // protected $table = 'users';
    // protected $primaryKey = 'user_id';
    // protected $keyType = 'int';

    // protected $fillable = [
    //     'first_name',
    //     'last_name',
    //     'pass_key',
    //     'phone',
    // ];

    protected $hidden = ['pass_key'];

    public function getAuthPassword(): string
    {
        return $this->pass_key;
    }

    public function requests(): HasMany {
        return $this->hasMany(Request::class, 'customer_id');
    }

    public function reporter(): HasMany {
        return $this->hasMany(Report::class, 'reporter_id');
    }

    public function reported(): HasMany {
        return $this->hasMany(Report::class, 'reported_id');
    }

    public function providers(): BelongsToMany {
        return $this->belongsToMany(Provider::class, 'ratings', 'customer_id')
            ->using(Rating::class);
    }

    public function accountStates(): HasMany {
        return $this->hasMany(AccountStatusLog::class, 'user_id');
    }

    protected function casts(): array
    {
        return [
            'pass_key' => 'hashed',
        ];
    }
}
