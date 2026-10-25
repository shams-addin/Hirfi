<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

/**
 * @property int $user_id
 * @property string $first_name
 * @property string|null $last_name
 * @property string $birth_date
 * @property string $pass_key
 * @property string $phone
 * @property string $address
 * @property string $nationality
 * @property string|null $profile_picture
 * @property string $account_state
 */
#[Table(key: 'user_id', timestamps: false)]
#[Fillable([
    'first_name',
    'last_name',
    'birth_date',
    'pass_key',
    'phone',
    'address',
    'nationality',
])
]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    protected $hidden = ['pass_key'];

    public function getAuthPassword(): string
    {
        return $this->pass_key;
    }

    /** @return HasOne<Provider, $this> */
    public function providers(): HasOne
    {
        return $this->hasOne(Provider::class, 'provider_id', 'user_id');
    }

    /** @return HasMany<Request, $this> */
    public function requests(): HasMany
    {
        return $this->hasMany(Request::class, 'customer_id');
    }

    /** @return HasMany<Report, $this> */
    public function reporter(): HasMany
    {
        return $this->hasMany(Report::class, 'reporter_id');
    }

    /** @return HasMany<Report, $this> */
    public function reported(): HasMany
    {
        return $this->hasMany(Report::class, 'reported_id');
    }

    /** @return BelongsToMany<Provider, $this, Rating> */
    public function sendRatings(): BelongsToMany
    {
        return $this->belongsToMany(Provider::class, 'ratings', 'customer_id')
            ->using(Rating::class);
    }

    /** @return HasMany<AccountStatusLog, $this> */
    public function accountStates(): HasMany
    {
        return $this->hasMany(AccountStatusLog::class, 'user_id');
    }

    protected function casts(): array
    {
        return [
            'pass_key' => 'hashed',
        ];
    }
}
