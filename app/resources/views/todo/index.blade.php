<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <script src="{{ asset('js/app.js') }}" defer></script>
    <title>Document</title>
</head>

<body>
    <h1>ToDoリスト</h1>
    <input type="radio" name="todo-radio" value="all" id="" checked>全て
    <input type="radio" name="todo-radio" value="working" id="">作業中
    <input type="radio" name="todo-radio" value="complete" id="">完了

    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>コメント</th>
                <th colspan="2">状態</th>
        </thead>
        <tbody id="todo-list">
            @foreach($todoLists as $todo)
            <tr>
                <td>{{ $loop->index }}</td>
                <td>{{ $todo->comment }}</td>
                <td><button value="{{ $todo->id }}">作業中</button></td>
                <td><button value="{{ $todo->id }}">削除</button></td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <h2>新規タスク追加</h2>
    <input type="text" name="task" id="task">
    <button id="task-add">追加</button>

    <button id="test">test</button>
</body>

</html>