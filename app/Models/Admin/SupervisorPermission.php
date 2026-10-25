<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

#[Table(name: 'supervisor_permissions', incrementing: false)]
class SupervisorPermission extends Pivot
{
    /** @return BelongsTo<Supervisor, $this> */
    public function supervisors(): BelongsTo
    {
        return $this->belongsTo(Supervisor::class);
    }

    /** @return BelongsTo<Permission, $this> */
    public function permissions(): BelongsTo
    {
        return $this->belongsTo(Permission::class);
    }
}
