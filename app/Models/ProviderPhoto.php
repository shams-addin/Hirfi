<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Table(incrementing: false)]
class ProviderPhoto extends Model
{
    protected $primaryKey = ['provider_id', 'pic_number'];
    
    public function providers():BelongsTo {
        return $this->belongsTo(Provider::class, 'provider_id');
    }
}
