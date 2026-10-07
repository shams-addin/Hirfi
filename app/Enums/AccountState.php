<?php

namespace App\Enums;

enum AccountState: string
{
    case ACTIVATED = 'activated';
    case SUSPENDED = 'suspended';
}
