require("./bootstrap");

const taskAddBtn = document.getElementById("task-add");
const url = "http://localhost/api/todo";
const csrf = document.getElementsByName("csrf-token")[0].content;
const tbody = document.getElementById('todo-list');
const deleteBtns = document.querySelectorAll('.delete-btn');

// 削除ボタンのイベント追加
for (let btn of [...deleteBtns]) {
	btn.addEventListener('click', function (e) {
		ajax(url, 'delete', { id: e.target.value }).then(function () {
			return ajax(url, 'fetch');
		}).then(function (response) {
			output(response, tbody);
		});
	})
}

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
		const status = response[i].status ? '完了' : '作業中';

		tr.innerHTML = `<tr><td>${i}</td>
			<td>${response[i].comment}</td>
			<td><button value="${response[i].id}">${status}</button></td>`;

		const deleteTd = document.createElement('td');
		deleteTd.appendChild(createDaleteBtn(response[i].id));
		tr.appendChild(deleteTd)

		tbody.appendChild(tr);
	}
}

// 削除、描画イベントを付与したbtn要素を返す
function createDaleteBtn(id) {
	const btn = document.createElement('button');
	btn.classList.add = "delete-btn";
	btn.textContent = '削除';
	btn.dataset.id = id;
	btn.addEventListener("click", function (e) {
		ajax(url, 'delete', { id: e.target.dataset.id }).then(function () {
			return ajax(url, 'fetch')
		}).then(function (response) {
			output(response, tbody);
		});
	});

	return btn;
}

// ダブルクリック防止
function ｄoubleClickPrevention(targetBtn, bool = true) {
	if (bool) {
		targetBtn.disabled = true;
	} else {
		targetBtn.disabled = false;
	}
}