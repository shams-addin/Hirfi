<?php

it('redirects a newly created user to the home page', function () {
    $response = $this->post('/sign-up', [
        'firstName' => 'Ahmed',
        'lastName' => 'Ali',
        'birthDate' => '2000-01-01',
        'password' => 'password123',
        'password_confirmation' => 'password123',
        'phone' => '0501234567',
        'address' => 'Tripoli',
        'accountType' => 'customer',
        'nationality' => 'libyan',
    ]);

    $response->assertRedirect('/');
    $this->assertDatabaseHas('users', [
        'phone' => '0501234567',
        'first_name' => 'Ahmed',
    ]);
});
