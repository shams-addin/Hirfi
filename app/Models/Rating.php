<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

/**
 * @property int $provider_id
 * @property int $customer_id
 * @property int $star_number
 * @property string|null $comment
 * @property string $rating_date
 */
#[Table(name: 'ratings', incrementing: false)]
#[Fillable(
    'star_number',
    'comment'
)]
class Rating extends Pivot
{
    /** @return BelongsTo<Provider, $this> */
    public function providers(): BelongsTo
    {
        return $this->belongsTo(Provider::class);
    }

    /** @return BelongsTo<User, $this> */
    public function users(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
