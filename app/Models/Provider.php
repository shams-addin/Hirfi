<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Table(key: 'provider_id')]
class Provider extends User
{
    public function requests(): HasMany {
        return $this->hasMany(Request::class, 'provider_id');
    }

    public function users(): BelongsToMany {
        return $this->belongsToMany(User::class, 'ratings', 'provider_id')
            ->using(Rating::class);
    }

    public function providerPhotos(): HasMany {
        return $this->hasMany(ProviderPhoto::class, 'provider_id');
    }

    public function categories(): BelongsTo {
        return $this->belongsTo(Category::class, 'provider_id');
    }
}
