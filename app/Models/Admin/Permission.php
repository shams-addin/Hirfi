<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

#[Table(name: 'permissions', key: 'permission_id', timestamps: false)]
#[Fillable(
    'permission_type'
)]
class Permission extends Model
{
    public function supervisors(): BelongsToMany {
        return $this->belongsToMany(Supervisor::class);
    }
}
