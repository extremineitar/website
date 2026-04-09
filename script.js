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

function ShowLoader(){
    document.querySelector("#loader").style.display = "flex";
}

function HideLoader() {
    document.querySelector("#loader").style.display = "none";
}

function AbrirProjeto(projeto) {
    document.querySelector("body").classList.add("modal-open");
    document.querySelector(".modal").classList.add("show");

    switch (projeto) {
        case "scp": document.getElementById("projeto_scp").classList.add("show"); break;
        case "metro": document.getElementById("projeto_metro").classList.add("show"); break;
        case "arab": document.getElementById("projeto_arab").classList.add("show"); break;
    }
}

function AbrirPaginaInicial() {
    const lst = document.querySelectorAll("#nav-items a");
    lst.forEach(function (a, index) {
        if (index == lst.length - 1)
            a.onclick = AbrirPaginaJogo;
        else
            a.onclick = "";
    });

    TogglePaginas();
}

function AbrirPaginaJogo() {

    ShowLoader();
    document.querySelectorAll("#nav-items a").forEach(function (a) {
        a.onclick = AbrirPaginaInicial;
    });

    TogglePaginas();

    const appid = 223710;

    fetch("https://cors.io/?url=https://store.steampowered.com/api/appdetails?appids=" + appid)
    .then(res => res.text())
    .then(text => {
        const data = JSON.parse(text);
        document.querySelector("#descricao-jogo").innerHTML = JSON.parse(data.body)[appid].data.short_description;
    })
    .finally(() => {
        fetch("https://cors.io/?url=" + encodeURIComponent("http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=AE7FABCA866FD1F1BB03FCA75925D765&steamid=76561198799239986&format=json&include_played_free_games=true"))
            .then(res => res.text())
            .then(text => {
                const data = JSON.parse(text);
                document.querySelector("#horas-jogadas").innerHTML = JSON.parse(data.body).response.games[15].playtime_forever / 60;

            })
            .finally(HideLoader);
    })
    .catch((error) => {
        document.querySelector("#pagina-jogo").innerHTML = `<div style='display: flex; width: 100%; justify-content: center;'><p>ocorreu um erro: ${error.message}</p></div>`;
    });

}

function TogglePaginas() {

    document.querySelector('.container-paginas').classList.toggle('switch');

    const pagInicial = document.querySelector("#pagina-inicial");
    const pagJogo = document.querySelector("#pagina-jogo");

    pagInicial.classList.toggle("show-pagina");
    pagJogo.classList.toggle("show-pagina");

    if (pagInicial.classList.contains("show-pagina"))
        pagInicial.style.visibility = "visible";
    else
        pagJogo.style.visibility = "visible";


    setTimeout(() => {
        if (pagInicial.classList.contains("show-pagina"))
            pagJogo.style.visibility = "hidden";
        else
            pagInicial.style.visibility = "hidden";

    }, 400);
}