// Carrossel otimizado e responsivo
class Carrossel {
    constructor() {
        this.contador = 1;
        this.totalSlides = 3;
        this.intervalo = null;
        this.tempoTransicao = 5000;
        this.pausado = false;
        
        this.inicializar();
    }

    inicializar() {
        // Definir primeiro slide como ativo
        document.getElementById('radio1').checked = true;
        
        // Adicionar event listeners para navegação manual
        this.adicionarEventListeners();
        
        // Iniciar navegação automática
        this.iniciarAutoplay();
        
        // Pausar em hover (opcional)
        this.adicionarControlesHover();
    }

    adicionarEventListeners() {
        for (let i = 1; i <= this.totalSlides; i++) {
            const radio = document.getElementById(`radio${i}`);
            if (radio) {
                radio.addEventListener('change', () => {
                    this.contador = i;
                    this.reiniciarAutoplay();
                });
            }
        }
    }

    proximaImagem() {
        if (this.pausado) return;
        
        this.contador++;
        
        if (this.contador > this.totalSlides) {
            this.contador = 1;
        }
        
        const radioAtivo = document.getElementById(`radio${this.contador}`);
        if (radioAtivo) {
            radioAtivo.checked = true;
        }
    }

    iniciarAutoplay() {
        this.pararAutoplay();
        this.intervalo = setInterval(() => {
            this.proximaImagem();
        }, this.tempoTransicao);
    }

    pararAutoplay() {
        if (this.intervalo) {
            clearInterval(this.intervalo);
            this.intervalo = null;
        }
    }

    reiniciarAutoplay() {
        this.pararAutoplay();
        setTimeout(() => {
            this.iniciarAutoplay();
        }, 1000);
    }

    adicionarControlesHover() {
        const slider = document.querySelector('.slider');
        if (slider) {
            slider.addEventListener('mouseenter', () => {
                this.pausado = true;
            });
            
            slider.addEventListener('mouseleave', () => {
                this.pausado = false;
            });
        }
    }

    // Método para controle manual externo
    irPara(slide) {
        if (slide >= 1 && slide <= this.totalSlides) {
            this.contador = slide;
            document.getElementById(`radio${slide}`).checked = true;
            this.reiniciarAutoplay();
        }
    }
}

// Inicializar carrossel quando DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    const carrossel = new Carrossel();
    
    // Disponibilizar globalmente para debug (opcional)
    window.carrossel = carrossel;
});