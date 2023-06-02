document.addEventListener("DOMContentLoaded", function() {
    let pregunta = document.getElementById("enviar");
    if (pregunta) {
      pregunta.addEventListener("click", comentarios);
    }
  
    let favorito = document.getElementById("favorito");
    if (favorito) {
      favorito.addEventListener("click", misfavorito);
    }
  
    let buttonbuscador = document.getElementById("buttonBuscador");
    buttonbuscador.addEventListener("click", buscador);
  
    if (window.location.href.includes('buscador.html')) {
      cargarcantidad();
    }
  
    if (window.location.href.includes('index.html')) {
      cargaproductos();
    }
  
    let idElement = document.getElementById("id");
    if (idElement) {
      cargapagina();
    }
  
    async function cargapagina() {
      let id = parseInt(document.getElementById("id").textContent);
  
      let selectElement = document.getElementById("ram");
      selectElement.addEventListener("change", updatePage); // Escucha el evento change en el select
  
      async function updatePage() {
        let selectedIndex = selectElement.selectedIndex;
        let selectedOption = selectElement.options[selectedIndex].value;
        let json = await cargarurl("https://my-json-server.typicode.com/agustinruatta/fake_json_server_db/products");
        json.forEach(producto => {
          producto.notebooksTypes.forEach(notebook => {
            if (producto.id === id) {
              let img = document.getElementById("img");
              let title = document.getElementById("title");
              let price = document.getElementById("price");
              let description = document.getElementById("description");
              let fabricante = document.getElementById("linkfabricante");
              img.src = producto.image_url;
              if (selectedOption == "8GB") {
                title.textContent = producto.title + " " + producto.notebooksTypes[0].ramAmount;
                price.textContent = "$" + producto.notebooksTypes[0].price;
              } else {
                title.textContent = producto.title + " " + producto.notebooksTypes[1].ramAmount;
                price.textContent = "$" + producto.notebooksTypes[1].price;
              }
              description.textContent = producto.description;
              fabricante.textContent = producto.factory_url;
              fabricante.href = producto.factory_url;
              document.title = producto.title;
            }
          });
        });
      }
  
      updatePage(); // Llama a la función inicialmente para establecer los valores correctamente
    }
  });
  

async function cargaproductos() {
    let grilla = document.getElementById("grilla");
    grilla.classList.add("grilla");
    let json = await cargarurl("https://my-json-server.typicode.com/agustinruatta/fake_json_server_db/products");

    json.forEach(producto => {
        producto.notebooksTypes.forEach(notebook => {
            let link = document.createElement("a");
            let articulo = document.createElement("div");
            articulo.classList.add("articulo");
            articulo.id = producto.id;
            let imagen = document.createElement("img");
            let divider = document.createElement("div");
            divider.classList.add("divider");
            let precio = document.createElement("p");
            precio.classList.add("price");
            let titulo = document.createElement("p");
            titulo.classList.add("title");

            let textotitulo = producto.title + " " + notebook.ramAmount;
            let textoprecio = notebook.price; 
            let textoimagen = producto.image_url;
            let textolink = producto.title.replace(/ /g, "_") + ".html";

            imagen.src = textoimagen;
            precio.textContent = "$" + textoprecio;
            titulo.textContent = textotitulo;
            link.href = textolink;

            articulo.appendChild(imagen);
            articulo.appendChild(divider);
            articulo.appendChild(precio);
            articulo.appendChild(titulo);
            link.appendChild(articulo)
            grilla.appendChild(link);
        });
    });
}


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