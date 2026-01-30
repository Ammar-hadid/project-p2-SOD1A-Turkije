const dateEl = document.querySelector('.timeline-date');

const now = new Date();

dateEl.textContent = now.toLocaleDateString('Nl-nl')