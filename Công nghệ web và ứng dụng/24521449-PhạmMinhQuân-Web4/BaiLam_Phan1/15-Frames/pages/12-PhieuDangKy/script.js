const registrationForm = document.querySelector('#registration-form');
const statusMessage = document.querySelector('#form-status');

registrationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const fullName = document.querySelector('#full-name').value.trim();
    statusMessage.textContent = `Thông tin của ${fullName} hợp lệ. Đây là bản minh họa, chưa gửi đăng ký.`;
});

registrationForm.addEventListener('reset', () => {
    statusMessage.textContent = '';
});
