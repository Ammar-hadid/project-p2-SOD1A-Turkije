import {loadComponent} from './assets/js/componentLoader.js';

const baseUrl = new URL('.', import.meta.url);

// Render header
loadComponent({file: new URL('./components/header.html', baseUrl), selector: 'header'})


// Render footer
loadComponent({file: new URL('./components/footer.html', baseUrl), selector: 'footer'});

// Render quiz
await loadComponent({file: new URL('./components/quiz.html', baseUrl), selector: '#quiz'})

import('./assets/js/quiz.js');