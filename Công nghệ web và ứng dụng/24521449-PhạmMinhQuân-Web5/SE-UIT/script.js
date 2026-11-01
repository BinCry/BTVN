const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#main-menu');
const closeMenu = () => {
    menu.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
};
menuButton.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', event => event.preventDefault());
});
document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        closeMenu();
        const target = document.querySelector(link.getAttribute('href'));
        if (target.id === 'home' || target.id === 'top') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
document.querySelector('.to-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        closeMenu();
        document.querySelectorAll('.news-item.open').forEach(item => {
            item.classList.remove('open');
            item.querySelector('button').setAttribute('aria-expanded', 'false');
        });
    }
});
document.addEventListener('click', event => {
    if (!event.target.closest('.site-header')) {
        closeMenu();
        document.querySelectorAll('.news-item.open').forEach(item => {
            item.classList.remove('open');
            item.querySelector('button').setAttribute('aria-expanded', 'false');
        });
    }
});
document.querySelectorAll('.news-item > button').forEach(button => {
    button.addEventListener('click', () => {
        const open = button.parentElement.classList.toggle('open');
        button.setAttribute('aria-expanded', String(open));
    });
});
const form = document.querySelector('#feedback-form');
const fields = [...form.querySelectorAll('input, textarea')];
const validate = field => {
    field.setCustomValidity('');
    if (!field.value.trim()) {
        field.setCustomValidity('Please fill out this field.');
    } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim())) {
        field.setCustomValidity('Please enter a valid email address.');
    }
};
fields.forEach(field => field.addEventListener('input', () => validate(field)));
form.addEventListener('submit', event => {
    fields.forEach(validate);
    if (!form.reportValidity()) event.preventDefault();
});
