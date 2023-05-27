window.onload = iniciar;
function iniciar(){
    let pregunta = document.getElementById("enviar");
    pregunta.addEventListener("click",comentarios);

    let favorito = document.getElementById("favorito");
    favorito.addEventListener("click",misfavorito);

    let buttonbuscador = document.getElementById("buttonBuscador");
    buttonbuscador.addEventListener("click",buscador);
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

    if(buscador === ""){
        buscador.focus();
        document.getElementById("buscador").style.border = "1px solid #3483fa";
    }else{
        window.location.href = "buscador.html?busqueda=" + textobuscador;
    }
}