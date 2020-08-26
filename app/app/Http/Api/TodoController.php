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
        $val['status'] = array_search('作業中', config('myapp.todo.status'));

        TodoList::create($val);
    }

    public function fetch(TodoRequest $request)
    {
        $todoLists = TodoList::where('status', array_search('作業中', config('myapp.todo.status')))
            ->get(['id', 'comment', 'status']);

        $todoLists->map(function ($item, $key) {
            $item['status'] = config('myapp.todo.status.' . $item->status);
            return $item;
        });

        return $todoLists;
    }
}
