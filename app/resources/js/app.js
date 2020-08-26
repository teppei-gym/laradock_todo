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
	ajax(url, "create", { comment: task.value })
		.then(function () {
			return ajax(url, 'fetch');
		})
		.then(function (response) {
			output(response, tbody);
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
function output(response, tbody) {
	while (tbody.firstChild) {
		tbody.removeChild(tbody.firstChild);
	}

	for (let i = 0; i < response.length; i++) {
		const tr = document.createElement('tr');

		tr.innerHTML = `<tr><td>${i}</td>
			<td>${response[i].comment}</td>
			<td><button value="${response[i].id}">作業中</button></td>`;
		const deleteTd = document.createElement('td');
		deleteTd.appendChild(addDeleteEvent(response[i].id));
		tr.appendChild(deleteTd);
		tbody.appendChild(tr);
	}
}

// 削除処理をイベントに付与したボタン要素を返す
function addDeleteEvent(id) {
	var btn = document.createElement('button');
	btn.classList.add = "delete-btn";
	btn.textContent = '削除';
	btn.value = id;
	btn.addEventListener("click", function (e) {
		ajax(url, 'delete', { id: id }).then(function (response) {
			return ajax(url, 'fetch')
		}).then(function (response) {
			output(response, tbody);
		});
	});

	return btn;
}