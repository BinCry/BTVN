const loginForm = document.querySelector('#login-form');
const greeting = document.querySelector('#greeting');
loginForm.addEventListener('submit', event => {
 event.preventDefault();
 document.querySelector('#greeting-name').textContent = document.querySelector('#username').value.trim() || 'bạn';
 greeting.hidden = false;
});
loginForm.addEventListener('reset', () => { greeting.hidden = true; });
