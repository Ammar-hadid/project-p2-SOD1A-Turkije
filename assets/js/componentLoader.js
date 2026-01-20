export function loadComponent({file, selector}) {
    const r = fetch(file);
    
    r.then(obj => obj.text())
    .then(html => document.querySelector(selector).innerHTML = html);
}

