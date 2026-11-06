// Seletores principais
const menuToggle = document.querySelector("#menu-toggle");
const menuLista = document.querySelector(".nav-list");
const linksMenu = document.querySelectorAll(".nav-list a");
const siteHeader = document.querySelector("#site-header");
const secoes = document.querySelectorAll("section[id]");
const elementosRevelar = document.querySelectorAll(".reveal");

/* ==========================================================================
   1. CONTROLE DO MENU MOBILE (COM ACESSIBILIDADE E EVENTOS DE FECHAMENTO)
   ========================================================================== */

function alternarMenu() {
    const isActive = menuToggle.classList.toggle("active");
    menuLista.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", isActive ? "true" : "false");
    menuToggle.setAttribute("aria-label", isActive ? "Fechar menu" : "Abrir menu");
}

function fecharMenu() {
    menuToggle.classList.remove("active");
    menuLista.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
}

if (menuToggle && menuLista) {
    // Abrir/fechar ao clicar no botão hambúrguer
    menuToggle.addEventListener("click", alternarMenu);

    // Fechar ao clicar em qualquer link de navegação
    linksMenu.forEach((link) => {
        link.addEventListener("click", fecharMenu);
    });

    // Fechar se clicar fora do menu
    document.addEventListener("click", (evento) => {
        if (
            menuLista.classList.contains("active") &&
            !menuLista.contains(evento.target) &&
            !menuToggle.contains(evento.target)
        ) {
            fecharMenu();
        }
    });

    // Fechar com a tecla Escape
    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape" && menuLista.classList.contains("active")) {
            fecharMenu();
        }
    });
}

/* ==========================================================================
   2. HEADER DINÂMICO NO SCROLL (VIDRO FOSCO E SOMBRA)
   ========================================================================== */

function atualizarHeaderNoScroll() {
    if (!siteHeader) return;
    if (window.scrollY > 40) {
        siteHeader.classList.add("scrolled");
    } else {
        siteHeader.classList.remove("scrolled");
    }
}

/* ==========================================================================
   3. SCROLLSPY (DESTAQUE AUTOMÁTICO DO LINK ATIVO NO MENU)
   ========================================================================== */

function destacarMenuNoScroll() {
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop;

    secoes.forEach((secao) => {
        const topoSecao = secao.offsetTop - 140;
        const alturaSecao = secao.offsetHeight;
        const idSecao = secao.getAttribute("id");

        if (scrollPos >= topoSecao && scrollPos < topoSecao + alturaSecao) {
            linksMenu.forEach((link) => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${idSecao}`) {
                    link.classList.add("active");
                }
            });
        }
    });
}

// Otimização do listener de rolagem
window.addEventListener("scroll", () => {
    atualizarHeaderNoScroll();
    destacarMenuNoScroll();
}, { passive: true });

// Execução inicial ao carregar a página
atualizarHeaderNoScroll();
destacarMenuNoScroll();

/* ==========================================================================
   4. SCROLL REVEAL (ANIMAÇÕES SUAVES DE ENTRADA AO ROLAR A PÁGINA)
   ========================================================================== */

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observerInstance) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observerInstance.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    elementosRevelar.forEach((elemento) => {
        revealObserver.observe(elemento);
    });
} else {
    // Fallback para navegadores sem suporte
    elementosRevelar.forEach((elemento) => {
        elemento.classList.add("visible");
    });
}
