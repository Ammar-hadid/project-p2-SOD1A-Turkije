export async function loadComponent({file, selector}) {
    const component = document.querySelector(selector);

    if (!component) return;

    const res = await fetch(file);
    component.innerHTML = await res.text();

}





