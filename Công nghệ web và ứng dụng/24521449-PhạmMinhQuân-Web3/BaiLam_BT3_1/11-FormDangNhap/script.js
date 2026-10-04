const loginForm = document.querySelector('#login-form');
const usernameInput = document.querySelector('#username');
const greetingName = document.querySelector('#greeting-name');

const resizeLoginBox = () => {
    const widthScale = (window.innerWidth * 0.6) / 505;
    const heightScale = (window.innerHeight * 0.62) / 255;
    const scale = Math.min(Math.max(1, Math.min(widthScale, heightScale)), 1.7);
    document.documentElement.style.setProperty('--login-scale', scale);
};

resizeLoginBox();
window.addEventListener('resize', resizeLoginBox);

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = usernameInput.value.trim() || 'bạn';
    greetingName.textContent = username;
    greeting.hidden = false;
});
