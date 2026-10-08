<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

class Rating extends Pivot
{
    public function providers(): BelongsTo {
        return $this->belongsTo(Provider::class);
    }

    public function users(): BelongsTo {
        return $this->belongsTo(User::class);
    }
}
