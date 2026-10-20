<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

#[Table(name: 'supervisor_permissions', incrementing: false)]
class SupervisorPermission extends Pivot
{
    public function supervisors(): BelongsTo {
        return $this->belongsTo(Supervisor::class);
    }
    
    public function permissions(): BelongsTo {
        return $this->belongsTo(Permission::class);
    }
}
