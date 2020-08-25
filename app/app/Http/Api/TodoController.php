<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use App\Http\Controllers\Controller;
use App\Modles\TodoList;

class TodoController extends Controller
{
    public function create(Request $request)
    {
        $val = $request->all();
        $val['status'] = config('myapp.todo.status.作業中');

        $created = TodoList::create($val);

        return [$created];
    }

    public function fetch(Request $request)
    {
        return TodoList::where('status', config('myapp.todo.status.作業中'))->get(['id', 'comment']);
    }
}
