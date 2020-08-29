<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Modles\TodoList;
use App\Http\Requests\Api\TodoRequest;

class TodoController extends Controller
{
    public function create(TodoRequest $request)
    {
        $val = $request->all();

        TodoList::create($val);
    }

    public function fetch(TodoRequest $request)
    {
        $todoLists = TodoList::where('status', 0)
            ->get(['id', 'comment', 'status']);

        return $todoLists;
    }

    public function delete(TodoRequest $request)
    {
        Todolist::find($request->id)->delete();
    }
}
