document.addEventListener("DOMContentLoaded", function() {
    let pregunta = document.getElementById("enviar");
    if(pregunta){
        pregunta.addEventListener("click",comentarios);
    }

    let favorito = document.getElementById("favorito");
    if(favorito){
        favorito.addEventListener("click",misfavorito);
    }

    let buttonbuscador = document.getElementById("buttonBuscador");
    buttonbuscador.addEventListener("click",buscador);
    cargarcantidad();
});

async function cargarcantidad() {
    let json = await cargarurl("https://my-json-server.typicode.com/agustinruatta/fake_json_server_db/statistics");
    document.getElementById("cantidad").textContent = json.amount_of_products;
  }

let comentarios = () =>{
    let comentario = document.getElementById("pregunta").value;
    if(comentario === ""){
        document.getElementById("pregunta").focus();
        document.getElementById("pregunta").setAttribute("placeholder", "");
        document.getElementById("pregunta").style.border = "1px solid #3483fa";
    }else{
        let elemento = document.createElement("p");
        let comentarionuevo = document.createTextNode(comentario);
        elemento.appendChild(comentarionuevo);
        document.getElementById("comentario").appendChild(elemento);
    }
}

let misfavorito = () => {
    let mifavorito = document.getElementById("favorito");
    let currentColor = window.getComputedStyle(mifavorito).color;
  
    if (currentColor === 'rgb(204, 204, 204)') {
      mifavorito.style.color = '#ff0000';
    } else {
      mifavorito.style.color = '#ccc';
    }
}

let buscador = () =>{
    let textobuscador = document.getElementById("buscador").value;

    if (textobuscador === "") {
        document.getElementById("buscador").focus();
        document.getElementById("buscador").style.border = "1px solid #3483fa";
    } else {
        window.location.href = "buscador.html?busqueda=" + textobuscador;
    }
}

async function cargarurl(url) {
    let response = await fetch(url);
    return response.json();
}