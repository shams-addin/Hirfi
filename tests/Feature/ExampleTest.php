<?php

use App\Models\User;

test('returns a successful response', function () {
    $user = User::create([
        'first_name' => 'Test',
        'last_name' => 'User',
        'birth_date' => '1990-01-01',
        'pass_key' => 'password',
        'phone' => '0912345678',
        'address' => 'Tripoli',
        'nationality' => 'libyan',
    ]);

    $this->actingAs($user);

    $response = $this->get(route('home'));

    $response->assertOk();
});
