function atualizar() {
    let valorSlider = document.getElementById("sliderUmidade").value;

    fetch(`/dados?umidade=${valorSlider}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("valor").innerText = data.umidade;
            
            let imgSolo = document.getElementById("estadoSolo");
            let ledV = document.getElementById("ledVermelho");
            let ledG = document.getElementById("ledVerde");
            let ledA = document.getElementById("ledAzul");

            [ledV, ledG, ledA].forEach(l => l.classList.remove("ativo"));

            if (data.umidade < 30) {
                imgSolo.src = "/static/img/seco.png";
                ledV.classList.add("ativo");
            } else if (data.umidade <= 70) {
                imgSolo.src = "/static/img/ideal.png";
                ledG.classList.add("ativo");
            } else {
                imgSolo.src = "/static/img/molhado.png";
                ledA.classList.add("ativo");
            }

            let bomba = document.getElementById("bombaImg");
            bomba.src = data.bomba ? "/static/img/bomba_on.png" : "/static/img/bomba_off.png";
        });
}

setInterval(atualizar, 2000);

atualizar();