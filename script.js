import {loadComponent} from './assets/js/componentLoader.js';

// Resolve component paths from the script location so nested pages work
const baseUrl = new URL('.', import.meta.url);

// Load header
loadComponent({file: new URL('./components/header.html', baseUrl), selector: 'header'});

// Load footer
loadComponent({file: new URL('./components/footer.html', baseUrl), selector: 'footer'});

console.log('script')
