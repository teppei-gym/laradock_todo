<?php

namespace App\Modles;

use Illuminate\Database\Eloquent\Model;

class TodoList extends Model
{
    protected $fillable = [
        'comment', 'status'
    ];
}
