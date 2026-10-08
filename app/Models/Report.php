<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Table(key: 'report_id')]
class Report extends Model
{
    public function reporter(): BelongsTo {
        return $this->belongsTo(User::class, 'reporter_id');
    }

    public function reported(): BelongsTo {
        return $this->belongsTo(User::class, 'reported_id');
    }
}
