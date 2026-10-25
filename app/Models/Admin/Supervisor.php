<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;

#[Table(name: 'supervisors', key: 'supervisor_id', timestamps: false)]
#[Fillable(
    'first_name',
    'second_name',
    'last_name',
    'pass_key',
    'phone',
)]
class Supervisor extends Authenticatable
{
    protected $hidden = ['pass_key'];

    /** @return BelongsToMany<Permission, $this> */
    public function permissions(): BelongsToMany
    {
        return $this->belongsToMany(Permission::class);
    }

    protected function casts(): array
    {
        return [
            'pass_key' => 'hashed',
        ];
    }
}
