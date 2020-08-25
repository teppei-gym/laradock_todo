require("./bootstrap");

const taskAddBtn = document.getElementById("task-add");
const url = "http://localhost/api/todo";
const csrf = document.getElementsByName("csrf-token")[0].content;
const table = document.getElementById('todo-list');

// 初期画面のリスト描画
ajax(url, 'fetch').then(function (response) {
	output(response, table);
})

// 新規作成
taskAddBtn.addEventListener("click", function () {
	const task = document.getElementById("task");
	ajax(url, "create", { comment: task.value }).then(function (response) {
		output(response, table);
		task.value = '';
	});
});

function ajax(url, method, sendObj = null, csrfToken = csrf) {
	let sendVal = '';

	if (sendObj) {
		for (let key in sendObj) {
			sendVal += `${key}=${sendObj[key]}&`;
		}
		sendVal.slice(0, -1);
	}

	return new Promise(function (resolve, reject) {
		const xhr = new XMLHttpRequest();
		xhr.open("POST", `${url}/${method}`);
		xhr.setRequestHeader("X-CSRF-token", csrfToken);
		xhr.setRequestHeader(
			"content-type",
			"application/x-www-form-urlencoded;charset=UTF-8"
		);

		xhr.send(sendVal);

		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 201)) {
				const response = (xhr.responseText !== '') ? JSON.parse(xhr.responseText) : '';
				resolve(response);
			}
		};
	});
}

// Todoリストの描画
function output(response, table) {
	for (let i in response) {
		const tr = document.createElement('tr');

		tr.innerHTML = `<tr><td>${response[i].id}</td>
			<td>${response[i].comment}</td>
			<td><button value="${response[i].id}">作業中</button></td>
			<td><button value="${response[i].id}">削除</button></td></tr>`;

		table.appendChild(tr);
	}
}