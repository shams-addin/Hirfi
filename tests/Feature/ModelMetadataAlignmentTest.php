<?php

use App\Models\Admin\Supervisor;
use App\Models\Category;
use App\Models\Provider;
use App\Models\ProviderPhoto;
use App\Models\User;

test('models align with the existing migration metadata', function () {
    $user = new User;
    $category = new Category;
    $provider = new Provider;
    $supervisor = new Supervisor;

    expect($user->getTable())->toBe('users')
        ->and($user->getKeyName())->toBe('user_id')
        ->and($category->getTable())->toBe('categories')
        ->and($category->getKeyName())->toBe('category_id')
        ->and($provider->getTable())->toBe('providers')
        ->and($provider->getKeyName())->toBe('provider_id')
        ->and($supervisor->getTable())->toBe('supervisors')
        ->and($supervisor->getKeyName())->toBe('supervisor_id');
});

test('composite-key photo records do not expose an unsupported Eloquent key', function () {
    $photo = new ProviderPhoto;

    expect($photo->getKey())->toBeNull();
});
