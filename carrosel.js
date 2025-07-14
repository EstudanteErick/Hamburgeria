// Carrossel touch/swipe
class Carrossel {
    constructor() {
        this.contador = 1;
        this.totalSlides = 3;
        this.intervalo = null;
        this.tempoTransicao = 5000;
        this.startX = 0;
        this.endX = 0;
        this.threshold = 50; // mínimo de pixels para detectar swipe
        
        this.inicializar();
    }

    inicializar() {
        // Definir primeiro slide como ativo
        document.getElementById('radio1').checked = true;
        
        // Adicionar event listeners para touch/swipe
        this.adicionarEventListeners();
        
        // Iniciar navegação automática
        this.iniciarAutoplay();
    }

    adicionarEventListeners() {
        const slider = document.querySelector('.slider');
        
        if (slider) {
            // Touch events para mobile
            slider.addEventListener('touchstart', (e) => {
                this.startX = e.touches[0].clientX;
                this.pararAutoplay();
            });

            slider.addEventListener('touchend', (e) => {
                this.endX = e.changedTouches[0].clientX;
                this.handleSwipe();
                this.reiniciarAutoplay();
            });

            // Mouse events para desktop
            slider.addEventListener('mousedown', (e) => {
                this.startX = e.clientX;
                this.pararAutoplay();
                e.preventDefault();
            });

            slider.addEventListener('mouseup', (e) => {
                this.endX = e.clientX;
                this.handleSwipe();
                this.reiniciarAutoplay();
            });

            // Prevenir seleção de texto
            slider.addEventListener('selectstart', (e) => {
                e.preventDefault();
            });
        }

        // Event listeners para os pontos indicadores
        for (let i = 1; i <= this.totalSlides; i++) {
            const dot = document.getElementById(`dot${i}`);
            if (dot) {
                dot.addEventListener('click', () => {
                    this.irParaSlide(i);
                });
            }
        }
    }

    handleSwipe() {
        const diffX = this.startX - this.endX;

        if (Math.abs(diffX) > this.threshold) {
            if (diffX > 0) {
                // Swipe para esquerda = próxima imagem
                this.proximaImagem();
            } else {
                // Swipe para direita = imagem anterior
                this.imagemAnterior();
            }
        }
    }

    proximaImagem() {
        this.contador++;
        
        if (this.contador > this.totalSlides) {
            this.contador = 1;
        }
        
        const radioAtivo = document.getElementById(`radio${this.contador}`);
        if (radioAtivo) {
            radioAtivo.checked = true;
        }
        
        this.reiniciarAutoplay();
    }

    imagemAnterior() {
        this.contador--;
        
        if (this.contador < 1) {
            this.contador = this.totalSlides;
        }
        
        const radioAtivo = document.getElementById(`radio${this.contador}`);
        if (radioAtivo) {
            radioAtivo.checked = true;
        }
        
        this.reiniciarAutoplay();
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

    // Método para ir direto para um slide específico
    irParaSlide(slideNumber) {
        if (slideNumber >= 1 && slideNumber <= this.totalSlides) {
            this.contador = slideNumber;
            const radioAtivo = document.getElementById(`radio${slideNumber}`);
            if (radioAtivo) {
                radioAtivo.checked = true;
            }
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
