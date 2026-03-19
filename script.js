document.addEventListener("DOMContentLoaded", function () {

    let tema = localStorage.getItem("tema")
    if (tema == null)
        tema = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark-mode" : "light-mode";

    const icone_tema = document.querySelector("#toggle-tema i");

    if (tema == "dark-mode") {
        icone_tema.classList.remove("fa-moon");
        icone_tema.classList.add("fa-sun");
    } else {
        icone_tema.classList.remove("fa-sun");
        icone_tema.classList.add("fa-moon");
    }

    document.body.classList.add(tema);
});


document.getElementById("toggle-tema").addEventListener("click", function () {
    const icone_tema = document.querySelector("#toggle-tema i");

    if (localStorage.getItem("tema") === "light-mode") {
        document.body.classList.add("dark-mode");
        document.body.classList.remove("light-mode");
        localStorage.setItem("tema", "dark-mode");
        icone_tema.classList.remove("fa-moon");
        icone_tema.classList.add("fa-sun");
    } else {
        document.body.classList.add("light-mode");
        document.body.classList.remove("dark-mode");
        localStorage.setItem("tema", "light-mode");
        icone_tema.classList.remove("fa-sun");
        icone_tema.classList.add("fa-moon");
    }
});

document.getElementById("btn-modal-scroller-prev").addEventListener("click", function () {
    const scroller = document.querySelector(".modal-scroller");
    let valorScroll = scroller.scrollLeft - 1570;
    scroller.scrollTo({
        left: valorScroll,
        behavior: "smooth"
    })
});

document.getElementById("btn-modal-scroller-next").addEventListener("click", function () {
    const scroller = document.querySelector(".modal-scroller");
    let valorScroll = scroller.scrollLeft + 1570;
    scroller.scrollTo({
        left: valorScroll,
        behavior: "smooth"
    })
});

document.querySelectorAll(".modal-scroller-background-go-back").forEach(function (div) {
    div.addEventListener("click", function () {
        document.querySelector("body").classList.remove("modal-open");
        document.querySelector(".modal").classList.remove("show");

        document.querySelector(".modal-scroller").scrollTo(0, 0);

        document.querySelectorAll(".modal-content").forEach(function (content) {
            content.classList.remove("show");
        });
    });
});

function AbrirProjeto(projeto) {
    document.querySelector("body").classList.add("modal-open");
    document.querySelector(".modal").classList.add("show");

    switch (projeto) {
        case "scp": document.getElementById("projeto_scp").classList.add("show");break;
        case "metro": document.getElementById("projeto_metro").classList.add("show");break;
        case "arab": document.getElementById("projeto_arab").classList.add("show");break;
    }
}