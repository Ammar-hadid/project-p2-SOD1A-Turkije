import {loadComponent} from './assets/js/componentLoader.js';
import {getSavedTheme, saveUserTheme} from './storage/storage.js';

const baseUrl = new URL('.', import.meta.url);

// Render header
await loadComponent({file: new URL('./components/header.html', baseUrl), selector: 'header'});

const input = document.getElementById('user-theme');

loadSavedTheme(input);

document.addEventListener('change', e => {
    const changeThemeBtn = e.target.closest('#theme-toggle-label');

    if (changeThemeBtn) {
        changeTheme(input);
    }
})

function loadSavedTheme(input) {
    if (!input) return;

    const currentTheme = getSavedTheme();

    document.documentElement.setAttribute('data-theme', currentTheme);

    currentTheme === 'light' ? input.checked = false : input.checked = true;
}

function changeTheme(input) {
    if (!input) return;

    if (input.checked === false) {
        saveUserTheme('light');
        loadSavedTheme(input);
    }

    else {
        saveUserTheme('dark');
        loadSavedTheme(input);
    }
}

// Render footer
loadComponent({file: new URL('./components/footer.html', baseUrl), selector: 'footer'});

// Render quiz
await loadComponent({file: new URL('./components/quiz.html', baseUrl), selector: '#quiz'})

import('./assets/js/quiz.js');