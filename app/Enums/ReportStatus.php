<?php

namespace App\Enums;

enum ReportStatus: string
{
    case NEW = 'new';
    case UNDER_REVIEW = 'under review';
}
