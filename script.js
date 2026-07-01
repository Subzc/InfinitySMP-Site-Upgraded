/* ==========================================
            LOADER
========================================== */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if(loader){

        setTimeout(() => {

            loader.classList.add("hide");

        }, 800);

    }

});

/* ==========================================
            NAVBAR
========================================== */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if(window.scrollY > 50){

        navbar.style.background =
        "rgba(10,12,18,.92)";

        navbar.style.borderBottom =
        "1px solid rgba(255,255,255,.08)";

    }else{

        navbar.style.background =
        "rgba(10,12,18,.65)";

    }

});

/* ==========================================
            SCROLL REVEAL
========================================== */

const revealElements = document.querySelectorAll(
    ".fade-up, .fade-left, .fade-right, .zoom, .rotate"
);

const revealObserver = new IntersectionObserver(

(entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},
{
    threshold:0.15
}

);

revealElements.forEach(el => {

    revealObserver.observe(el);

});

/* ==========================================
            FAQ
========================================== */

const faqItems =
document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question =
    item.querySelector(".faq-question");

    const answer =
    item.querySelector(".faq-answer");

    question.addEventListener("click", () => {

        const active =
        document.querySelector(".faq-item.active");

        if(active && active !== item){

            active.classList.remove("active");

            active.querySelector(".faq-answer")
            .style.maxHeight = null;

        }

        item.classList.toggle("active");

        if(item.classList.contains("active")){

            answer.style.maxHeight =
            answer.scrollHeight + "px";

        }else{

            answer.style.maxHeight = null;

        }

    });

});

/* ==========================================
            COPIAR IP
========================================== */

const ipBox =
document.querySelector(".server-ip");

if(ipBox){

    ipBox.addEventListener("click", () => {

        const ip =
        "play.infinitysmp.com";

        navigator.clipboard.writeText(ip);

        const original =
        ipBox.innerHTML;

        ipBox.innerHTML =
        "<span>✓</span> IP Copiado!";

        setTimeout(() => {

            ipBox.innerHTML = original;

        }, 2000);

    });

}

/* ==========================================
            CONTADOR ANIMADO
========================================== */

const counters =
document.querySelectorAll("[data-count]");

const counterObserver =
new IntersectionObserver(

(entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            const counter =
            entry.target;

            const target =
            Number(counter.dataset.count);

            let count = 0;

            const speed =
            target / 100;

            const update = () => {

                count += speed;

                if(count < target){

                    counter.innerText =
                    Math.floor(count);

                    requestAnimationFrame(update);

                }else{

                    counter.innerText =
                    target;

                }

            };

            update();

            counterObserver.unobserve(counter);

        }

    });

},
{
    threshold:0.5
}

);

counters.forEach(counter => {

    counterObserver.observe(counter);

});

/* ==========================================
            BOTÃO TOPO
========================================== */

const backToTop =
document.getElementById("backToTop");

if(backToTop){

    window.addEventListener("scroll", () => {

        if(window.scrollY > 500){

            backToTop.classList.add("show");

        }else{

            backToTop.classList.remove("show");

        }

    });

    backToTop.addEventListener("click", () => {

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}

/* ==========================================
            CURSOR DE LUZ
========================================== */

const cursor =
document.getElementById("cursor");

if(cursor){

    document.addEventListener("mousemove",(e)=>{

        cursor.style.left =
        e.clientX + "px";

        cursor.style.top =
        e.clientY + "px";

    });

    const hoverElements =
    document.querySelectorAll(
        "a, button, .card, .feature, .member"
    );

    hoverElements.forEach(el => {

        el.addEventListener("mouseenter",()=>{

            cursor.classList.add("hover");

        });

        el.addEventListener("mouseleave",()=>{

            cursor.classList.remove("hover");

        });

    });

}

/* ==========================================
            EFEITO NAS CARDS
========================================== */

const mouseCards =
document.querySelectorAll(
    ".card-mouse-effect"
);

mouseCards.forEach(card=>{

    card.addEventListener("mousemove",(e)=>{

        const rect =
        card.getBoundingClientRect();

        const x =
        e.clientX - rect.left;

        const y =
        e.clientY - rect.top;

        card.style.setProperty("--x",`${x}px`);
        card.style.setProperty("--y",`${y}px`);

    });

});

/* ==========================================
            PARALLAX
========================================== */

const hero =
document.querySelector(".hero");

window.addEventListener("scroll",()=>{

    const value =
    window.scrollY * 0.3;

    if(hero){

        hero.style.transform =
        `translateY(${value}px)`;

    }

});

/* ==========================================
            PARTICLES
========================================== */

const particles =
document.querySelector(".particles");

if(particles){

    for(let i=0;i<40;i++){

        const particle =
        document.createElement("span");

        particle.style.position =
        "absolute";

        particle.style.width =
        Math.random()*4+2+"px";

        particle.style.height =
        particle.style.width;

        particle.style.background =
        "rgba(139,92,246,.6)";

        particle.style.borderRadius =
        "50%";

        particle.style.left =
        Math.random()*100+"%";

        particle.style.top =
        Math.random()*100+"%";

        particle.style.animation =
        `float ${
            Math.random()*8+5
        }s infinite ease-in-out`;

        particles.appendChild(particle);

    }

}

/* ==========================================
            STATUS SERVIDOR
========================================== */

async function updateServerStatus(){

    const players =
    document.getElementById("playersOnline");

    if(!players) return;

    try{

        /*
        EXEMPLO API:

        https://api.mcsrvstat.us/3/play.infinitysmp.com

        */

        const response =
        await fetch(
        "https://api.mcsrvstat.us/3/play.infinitysmp.com"
        );

        const data =
        await response.json();

        if(data.online){

            players.innerText =
            data.players.online;

        }

    }catch(error){

        console.log(
            "Erro ao buscar status"
        );

    }

}

updateServerStatus();

setInterval(
updateServerStatus,
60000
);