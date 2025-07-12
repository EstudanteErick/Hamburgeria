function menuShow() {
    const menuMobile = document.querySelector('.mobile-menu');
    const icon = document.querySelector('.icon');
    const body = document.body;
    
    if (menuMobile.classList.contains('open')) {
        menuMobile.classList.remove('open');
        icon.src = "imagens/menu_white_36dp.svg";
        body.style.overflow = 'auto';
    } else {
        menuMobile.classList.add('open');
        icon.src = "imagens/close_white_36dp.svg";
        body.style.overflow = 'hidden';
    }
}

// Fechar menu quando clicar em um link
document.addEventListener('DOMContentLoaded', function() {
    const mobileLinks = document.querySelectorAll('.mobile-menu .nav-link');
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            const menuMobile = document.querySelector('.mobile-menu');
            const icon = document.querySelector('.icon');
            const body = document.body;
            
            menuMobile.classList.remove('open');
            icon.src = "imagens/menu_white_36dp.svg";
            body.style.overflow = 'auto';
        });
    });
    
    // Fechar menu ao redimensionar a tela para desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            const menuMobile = document.querySelector('.mobile-menu');
            const icon = document.querySelector('.icon');
            const body = document.body;
            
            menuMobile.classList.remove('open');
            icon.src = "imagens/menu_white_36dp.svg";
            body.style.overflow = 'auto';
        }
    });
});