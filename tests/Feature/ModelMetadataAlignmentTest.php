<?php

use App\Models\Category;
use App\Models\Customer;
use App\Models\Provider;
use App\Models\Supervisor;
use App\Models\User;
test('models align with the existing migration metadata', function () {
    $user = new User();
    $category = new Category();
    $customer = new Customer();
    $provider = new Provider();
    $supervisor = new Supervisor();

    expect($user->getTable())->toBe('users')
        ->and($user->getKeyName())->toBe('user_id')
        ->and($category->getTable())->toBe('categories')
        ->and($category->getKeyName())->toBe('category_id')
        ->and($customer->getTable())->toBe('customers')
        ->and($customer->getKeyName())->toBe('customer_id')
        ->and($provider->getTable())->toBe('providers')
        ->and($provider->getKeyName())->toBe('provider_id')
        ->and($supervisor->getTable())->toBe('suoervisors')
        ->and($supervisor->getKeyName())->toBe('suoervisor_id');
});