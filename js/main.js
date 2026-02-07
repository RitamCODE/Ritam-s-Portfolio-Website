let menu = document.querySelector('#menu-bars');
let header = document.querySelector('header');
let themeToggle = document.querySelector('#theme-toggle');
let themeStorageKey = 'portfolio-theme';

function getStoredTheme() {
    try {
        return localStorage.getItem(themeStorageKey);
    } catch (error) {
        return null;
    }
}

function setStoredTheme(theme) {
    try {
        localStorage.setItem(themeStorageKey, theme);
    } catch (error) {
        // Ignore storage errors and continue with in-memory theme state.
    }
}

function getPreferredTheme() {
    let storedTheme = getStoredTheme();

    if (storedTheme === 'light' || storedTheme === 'dark') {
        return storedTheme;
    }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }

    return 'light';
}

function applyTheme(theme) {
    let isDark = theme === 'dark';
    document.body.classList.toggle('dark-theme', isDark);

    if (themeToggle) {
        themeToggle.setAttribute('aria-pressed', String(isDark));
        themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        themeToggle.innerHTML = isDark
            ? '<i class="fa-solid fa-sun" aria-hidden="true"></i>'
            : '<i class="fa-solid fa-moon" aria-hidden="true"></i>';
    }
}

applyTheme(getPreferredTheme());

if (themeToggle) {
    themeToggle.onclick = () => {
        let nextTheme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
        applyTheme(nextTheme);
        setStoredTheme(nextTheme);
    };
}

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    header.classList.toggle('active');
};

window.onscroll = () => {
    menu.classList.remove('fa-times');
    header.classList.remove('active');
};

var typed = new Typed('.typing-text', {
    strings: ['Developer', 'A problem solver', 'A python developer', 'Bit of a web developer', 'AI developer', 'currently a cse undergrad', 'Student of Indian Classical Music', 'I play the Bansuri', 'I am also a Painter'],
    loop: true,
    typeSpeed: 200
});

VanillaTilt.init(document.querySelectorAll('.tilt'), {
    max: 25
});
