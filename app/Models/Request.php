<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Table(key: 'request_id')]
class Request extends Model
{
    public function users(): BelongsTo {
        return $this->belongsTo(User::class);
    }
    
    public function providers(): BelongsTo {
        return $this->belongsTo(Provider::class);
    }
}
