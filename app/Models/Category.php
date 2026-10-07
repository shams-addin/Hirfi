<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Category extends Model
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    protected $table = 'categories';
    protected $primaryKey = 'category_id';
    protected $keyType = 'int';

    protected $fillable = [
        'category_name',
        'supervisor_id',
    ];

    public function supervisor(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Supervisor::class, 'supervisor_id', 'supervisor_id');
    }

    public function provider(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Provider::class, 'category_id', 'category_id');
    }

    protected function casts(): array
    {
        return [
            'category_id' => 'integer',
        ];
    }
}
