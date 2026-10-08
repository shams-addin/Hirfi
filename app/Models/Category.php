<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Table(name: 'categories', key: 'category_id')]
class Category extends Model
{
    public function providers(): HasMany {
        return $this->hasMany(Provider::class);
    }
}
