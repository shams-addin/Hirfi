<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Table(key: 'provider_id', timestamps: false)]
#[Fillable('category_id')]
class Provider extends User
{
    /** @return BelongsTo<User, $this> */
    public function users(): BelongsTo
    {
        return $this->belongsTo(User::class, 'provider_id', 'user_id');
    }

    /** @return HasMany<Request, $this> */
    public function requests(): HasMany
    {
        return $this->hasMany(Request::class, 'provider_id');
    }

    /** @return BelongsToMany<User, $this, Rating> */
    public function getRatings(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'ratings', 'provider_id')
            ->using(Rating::class);
    }

    /** @return HasMany<ProviderPhoto, $this> */
    public function providerPhotos(): HasMany
    {
        return $this->hasMany(ProviderPhoto::class, 'provider_id');
    }

    /** @return BelongsTo<Category, $this> */
    public function categories(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'provider_id');
    }
}
