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
const form = document.querySelector('#booking-form');
const departureDate = form.elements.departure_date;
const returnDate = form.elements.return_date;
const departureDisplay = document.querySelector('#departure-display');
const returnDisplay = document.querySelector('#return-display');
const parseDate = value => {
    const match = /^(\d{2})\/(\d{2})\/(\d{2})$/.exec(value);
    if (!match) return '';
    const [, day, month, year] = match;
    const date = new Date(2000 + Number(year), Number(month) - 1, Number(day));
    if (date.getFullYear() !== 2000 + Number(year) || date.getMonth() !== Number(month) - 1 || date.getDate() !== Number(day)) return '';
    return `20${year}-${month}-${day}`;
};
const validateDates = () => {
    [[departureDisplay, departureDate], [returnDisplay, returnDate]].forEach(([display, picker]) => {
        picker.value = parseDate(display.value);
        display.setCustomValidity(display.value && !picker.value ? 'Vui lòng nhập ngày hợp lệ theo định dạng dd/mm/yy (năm 2000–2099).' : '');
    });
    if (returnDate.value && departureDate.value && returnDate.value < departureDate.value) {
        returnDisplay.setCustomValidity('Ngày về phải sau hoặc bằng ngày đi.');
    }
};
document.querySelectorAll('.date-field').forEach(field => {
    const display = field.querySelector('.date-display');
    const picker = field.querySelector('.date-picker');
    display.addEventListener('input', validateDates);
    picker.addEventListener('change', () => {
        const [year, month, day] = picker.value.split('-');
        display.value = picker.value ? `${day}/${month}/${year.slice(-2)}` : '';
        validateDates();
    });
    field.querySelector('.calendar-button').addEventListener('click', () => {
        if (typeof picker.showPicker === 'function') {
            picker.showPicker();
        } else {
            display.focus();
        }
    });
});
form.addEventListener('submit', event => {
    validateDates();
    if (!form.reportValidity()) event.preventDefault();
});
document.querySelectorAll('.book-button').forEach((button, index) => {
    const routes = [['Hà Nội', 'Tp. Hồ Chí Minh'], ['Đà Nẵng', 'Hà Nội'], ['Tp. Hồ Chí Minh', 'Phú Quốc']];
    button.addEventListener('click', () => {
        form.elements.departure.value = routes[index][0];
        form.elements.destination.value = routes[index][1];
        document.querySelector('#flights').scrollIntoView({ behavior: 'smooth' });
        departureDisplay.focus({ preventScroll: true });
    });
});
