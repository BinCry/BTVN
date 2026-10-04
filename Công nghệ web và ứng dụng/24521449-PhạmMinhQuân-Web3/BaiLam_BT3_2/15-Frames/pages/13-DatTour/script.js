const travelForm = document.querySelector('#travel-form');
const tourSelect = document.querySelector('#tour');
const travelStatus = document.querySelector('#travel-status');

tourSelect.addEventListener('change', () => {
    document.body.dataset.background = tourSelect.value;
});

travelForm.addEventListener('submit', (event) => {
    event.preventDefault();
    travelStatus.textContent = 'Bạn đã đăng ký thành công!!!';
});
