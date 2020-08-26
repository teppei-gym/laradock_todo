require("./bootstrap");

const taskAddBtn = document.getElementById("task-add");
const url = "http://localhost/api/todo";
const csrf = document.getElementsByName("csrf-token")[0].content;
const tbody = document.getElementById('todo-list');

// 初期画面のリスト描画
ajax(url, 'fetch').then(function (response) {
	output(response, tbody);
})

// 新規作成
taskAddBtn.addEventListener("click", function () {
	const task = document.getElementById("task");
	if (task.value === '') return;

	ｄoubleClickPrevention(this);

	ajax(url, "create", { comment: task.value })
		.then(function () {
			return ajax(url, 'fetch');
		})
		.then(function (response) {
			output(response, tbody);
		});

	ｄoubleClickPrevention(this, false);
	task.value = "";
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
function output(response, tbody) {
	while (tbody.firstChild) {
		tbody.removeChild(tbody.firstChild);
	}

	for (let i = 0; i < response.length; i++) {
		const tr = document.createElement('tr');

		tr.innerHTML = `<tr><td>${i}</td>
			<td>${response[i].comment}</td>
			<td><button value="${response[i].id}">${response[i].status}</button></td>
			<td><button value="${response[i].id}">削除</button></td>`;

		tbody.appendChild(tr);
	}
}

// ダブルクリック防止
function ｄoubleClickPrevention(targetBtn, bool = true) {
	if (bool) {
		targetBtn.disabled = true;
	} else {
		targetBtn.disabled = false;
	}
}