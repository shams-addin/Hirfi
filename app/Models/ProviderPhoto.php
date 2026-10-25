<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * The table has a composite key; this model is queried but not saved through Eloquent.
 *
 * @property int $provider_id
 * @property int $pic_number
 * @property string $pic
 */
#[Table(incrementing: false)]
class ProviderPhoto extends Model
{
    /** @return BelongsTo<Provider, $this> */
    public function providers(): BelongsTo
    {
        return $this->belongsTo(Provider::class, 'provider_id');
    }
}
