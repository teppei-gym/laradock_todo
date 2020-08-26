<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Modles\TodoList;

class TodoController extends Controller
{
    public function index()
    {
        $todoLists = Todolist::all();

        return view('todo.index', compact('todoLists'));
    }
}
