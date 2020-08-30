<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="{{ asset('js/app.js') }}" defer></script>
    <title>Document</title>
</head>

<body>
    <h1>ToDoリスト</h1>
    <form action="{{ route('index') }}" method="get">
        <input type="radio" class="todo-status" name="status" value="" {{ is_null(request()->input('status')) ? 'checked' : '' }}>全て
        <input type="radio" class="todo-status" name="status" value="0" {{ request()->input('status') === '0' ? 'checked' : '' }}>作業中
        <input type="radio" class="todo-status" name="status" value="1" {{ request()->input('status') == 1 ? 'checked' : '' }}>完了
        <input type="submit" id="status-submit" style="display:none;">
    </form>

    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>コメント</th>
                <th colspan="2">状態</th>
        </thead>
        <tbody id="todo-list">
            @foreach($todoList as $todo)
            <tr>
                <td>{{ $loop->index }}</td>
                <td>{{ $todo->comment }}</td>
                <td>
                    <form action="{{ route('update', ['id' => $todo->id] ) }}" method="post">
                        @csrf
                        <input type="hidden" name="_method" value="put">
                        <input type="hidden" name="status" value="{{ $todo->status }}">
                        <button>{{ $todo->status ? '完了' : '作業中'}}</button>
                    </form>
                </td>
                <td>
                    <form action="{{ route('destroy', ['id' => $todo->id]) }}" method="post">
                        @csrf
                        <input type="hidden" name="_method" value="DELETE">
                        <button>削除</button>
                    </form>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <h2>新規タスク追加</h2>
    <form action="{{ route('store') }}" method="post">
        @csrf
        <input type="text" name="comment">
        <button id="task-add">追加</button>
    </form>
</body>

</html>