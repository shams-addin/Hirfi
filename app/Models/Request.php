<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $request_id
 * @property string $description
 * @property string|null $pic
 * @property string $request_address
 * @property string $request_date
 * @property string $request_state
 * @property int $provider_id
 * @property int $customer_id
 */
#[Table(key: 'request_id', timestamps: false)]
#[Fillable([
    'customer_id',
    'provider_id',
    'description',
    'request_address',
    'pic',
])
]
class Request extends Model
{
    /** @return BelongsTo<User, $this> */
    public function users(): BelongsTo
    {
        return $this->belongsTo(User::class, 'customer_id', 'user_id');
    }

    /** @return BelongsTo<Provider, $this> */
    public function providers(): BelongsTo
    {
        return $this->belongsTo(Provider::class, 'provider_id', 'provider_id');
    }
}
