const r = fetch('../../components/footer.html');

r.then(obj => obj.text())
.then(html => document.querySelector('footer').innerHTML = html);