require("./bootstrap");

const radios = document.querySelectorAll('.todo-status');
const submit = document.getElementById('status-submit');

for (let radio of [...radios]) {
	radio.addEventListener('change', () => submit.click());
}
