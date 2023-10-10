// Se define un arreglo para almacenar productos.
let productos = [];
const URL_API = "https://run.mocky.io/v3/b964dd4a-353a-4a79-83b7-a4630187b170"
// Se realiza una solicitud HTTP fetch para obtener datos de un archivo JSON.
async function obtenerProductos() {
    try {
      const response = await fetch(URL_API);
      if (!response.ok) {
        throw new Error('La solicitud no se pudo completar correctamente.');
      }
      const data = await response.json();
      productos = data;
      cargarProductos(productos);
    } catch (error) {
      console.error('Se produjo un error:', error);
      // Aquí puedes agregar código para manejar el error, si es necesario.
    }
  }
  
  // Llama a la función para obtener productos
  obtenerProductos();
  
// Se seleccionan elementos del DOM.
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

// Se agrega un oyente de eventos a los botones de categoría para ocultar un aside.
botonesCategorias.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
}));

// Función para mostrar un popup al hacer clic en un producto.
function mostrarPopUp() {
    const figures = document.querySelectorAll("figure");

    // Se agrega un manejador de clic a cada elemento <figure>.
    figures.forEach((figure) => {
        figure.addEventListener("click", () => {
            const productId = figure.getAttribute("data-product-id"); // Obtener el id del producto desde un atributo personalizado.

            // Buscar el producto correspondiente en tu array de productos
            const producto = productos.find((p) => p.id === productId);

            if (producto) {
                Swal.fire({
                    imageUrl: `${producto.imagen}`,
                    imageWidth: 261,
                    imageHeight: 392,
                    imageAlt: `Caratula del juego: ${producto.nombre}`,
                    showClass: {
                        popup: 'animate__animated animate__fadeInUpBig'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutDownBig'
                    },
                    html: `
                    <article class="product-popup">
                        <figure class="product-image">
                            
                        </figure>
                        <section class="product-details">
                            <h2>${producto.titulo}</h2>
                            <h3 class="product-desc-title">Descripción:</h3>
                            <p class="product-description">${producto.descripcion}</p>
                            <p class="product-price">$${producto.precio}</p>
                            <button class="producto-agregar" id="${producto.id}"> <i class="fa-solid fa-cart-shopping"></i> Agregar al carrito</button>
                        </section>
                    </article>`,
                    confirmButtonText: 'Cerrar',
                    confirmButtonColor: "var(--clr-gray)",
                    customClass: {
                        popup: 'custom-popup',
                    },
                    width: '600', // Personaliza el ancho del popup según tus necesidades
                });
            } else {
                console.error(`No se encontró el producto con id: ${productId}`);
            }

            actualizarBotonesAgregar();
        });

    });
}


// Función para cargar productos en el contenedor.
function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const article = document.createElement("article");
        article.classList.add("producto");
        article.innerHTML = `
            <figure id="figure-producto" data-product-id="${producto.id}"><img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <figcaption class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                </figcaption></figure>
        `;

        contenedorProductos.append(article);
    });

    actualizarBotonesAgregar();
    mostrarPopUp();
}

// Se añade un oyente de eventos a los botones de categoría para filtrar productos.
botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        const iconos = document.querySelectorAll(".icon-todos"); 
        iconos.forEach(icono => icono.classList.remove("fa-spin")); 

        e.currentTarget.classList.add("active");
        const iconoActual = e.currentTarget.querySelector(".fa-solid.fa-circle-nodes"); 
        iconoActual.classList.add("fa-spin");
        
        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los juegos";
            cargarProductos(productos);
        }
    });
});

// Función para actualizar los botones "Agregar al carrito".
function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

// Arreglo para almacenar productos en el carrito.
let productosEnCarrito;

// Se verifica si hay productos en el carrito almacenados en el almacenamiento local.
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS); // Se recuperan los productos del carrito.
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

// Función para agregar un producto al carrito.
function agregarAlCarrito(e) {
    // Se muestra un mensaje de éxito mediante un toast.
    Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'El producto se ha agregado al carrito',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
    });

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito)); // Se guarda el carrito en el almacenamiento local.
}

// Función para actualizar el contador de productos en el carrito.
function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}

