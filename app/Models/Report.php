<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $report_id
 * @property string $report_type
 * @property string|null $description
 * @property string $report_date
 * @property int $reporter_id
 * @property int $reported_id
 */
#[Table(key: 'report_id', incrementing: false)]
#[Fillable(
    'report_type',
    'description',
    'reporter_id',
    'reported_id',
)]
class Report extends Model
{
    /** @return BelongsTo<User, $this> */
    public function reporter(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reporter_id');
    }

    /** @return BelongsTo<User, $this> */
    public function reported(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reported_id');
    }
}
