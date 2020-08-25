<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Modles\TodoList;

class TodoController extends Controller
{
    public function index()
    {
        return view('todo.index');
    }
}
