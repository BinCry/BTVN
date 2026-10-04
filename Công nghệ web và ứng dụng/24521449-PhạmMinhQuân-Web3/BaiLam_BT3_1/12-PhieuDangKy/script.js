const registrationForm = document.querySelector('#registration-form');
const statusMessage = document.querySelector('#form-status');

registrationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const fullName = document.querySelector('#full-name').value.trim();
    statusMessage.textContent = `Đăng ký thành công cho ${fullName}.`;
});

registrationForm.addEventListener('reset', () => {
    statusMessage.textContent = '';
});
