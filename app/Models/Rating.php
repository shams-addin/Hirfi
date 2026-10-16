<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

#[Table(name: 'ratings', incrementing: false)]
#[Fillable(
    'star_number',
    'comment'
)]
class Rating extends Pivot
{
    public function providers(): BelongsTo {
        return $this->belongsTo(Provider::class);
    }

    public function users(): BelongsTo {
        return $this->belongsTo(User::class);
    }
}
