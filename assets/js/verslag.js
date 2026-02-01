const paragraphWrapper = document.querySelector('.text');

document.addEventListener('click', e => {
    const navLink = e.target.closest('.nav-link');
 
    if (navLink) {
        e.preventDefault();

        const paragraphId = navLink.getAttribute('href');
        const paragraph = paragraphWrapper.querySelector(paragraphId);

        if (!paragraph) {
            console.error('ERROR: Paragraph not found');
            return
        }

        paragraphWrapper.scrollTo({
            top: paragraph.offsetTop,
            behavior: 'smooth'
        });
    }
})