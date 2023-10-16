// Se define un arreglo para almacenar productos.
let productos = [];
const URL_API = "https://run.mocky.io/v3/c1c5ced9-f4f9-4fdd-957d-f3aa8f968db0"
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
const paginaProducto = document.querySelector("#product-page")
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");
const atras = document.querySelector("#atras")


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
                tituloPrincipal.innerText=`${producto.titulo}`
                tituloPrincipal.classList.add("text-right")
                contenedorProductos.classList.add("disabled")
                paginaProducto.classList.remove("disabled")
                atras.classList.remove("disabled")
              paginaProducto.innerHTML = `<article class="product-popup">
              <section class="product-details">
                <figure class="video-container">
                <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/${producto.trailer}"
                frameborder="0"
                 allowfullscreen
                ></iframe> </figure>
                  <h3 class="product-desc-title">Descripción:</h3>
                  <p class="product-description">${producto.descripcion}</p>
                  </section>
                  <section class="product-right">
                  <h4 class="product-title">${producto.titulo}</h4>
                  <figure class="product-figure">
              <img class="product-image" src="${producto.imagen}" alt="Caratula del juego: ${producto.nombre}">
              </figure>
                  <p class="product-price">Precio: $${producto.precio}</p>
                  <section class="btns-page">
                  <button class="carrito-acciones-comprar" id="comprar-ya"> <i class="fa-regular fa-credit-card"></i> Comprar Ahora</button>
                  <button class="producto-agregar" id="${producto.id}"><i class="fa-solid fa-cart-shopping carrito-icon"></i>Agregar al carrito</button>
                  </section>
                  </section>
                  
          </article>
          
          `
            } else {
                console.error(`No se encontró el producto con id: ${productId}`);
            }

            actualizarBotonesAgregar();
            comprarYa()
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
            <figure id="figure-producto" data-product-id="${producto.id}" class="figure-producto"><img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
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
            contenedorProductos.classList.remove("disabled")
            paginaProducto.classList.add("disabled")
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los juegos";
            contenedorProductos.classList.remove("disabled")
            paginaProducto.classList.add("disabled")
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
        iconColor: `#282828`,
        title: 'Éxito',
        text: 'El producto se ha agregado al carrito',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        background: `#ffee00`
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

// Función para agregar la opcion de comprar ya 
function comprarYa(){
    const comprarYaBtn = document.querySelector("#comprar-ya")
    comprarYaBtn.addEventListener("click", comprarCarrito)
}



function comprarCarrito() {
    Swal.fire({
        title: 'Pedido de Tarjeta de Crédito',
        imageUrl: "./img/tarjeta.svg",
        imageWidth: "200px",
        html: 'Por favor, ingrese los detalles de su tarjeta de crédito:' + 
           ` <form class="formu-tarjeta">
            <label for="tarjeta">Número de tarjeta</label>
            <input type="text" id="tarjeta" class="swal2-input" placeholder="Número de tarjeta">
            <label for="cvv">CVV</label> 
            <input type="text" id="cvv" class="swal2-input" placeholder="CVV">
            <label for="fecha">Fecha de Vencimiento</label>
            <input type="text" id="fecha" class="swal2-input" placeholder="Vencimiento (MM/YY)">
            <label for="correo">Su dirección de E-mail</label>
            <input type="email" id="correo" class="swal2-input" placeholder="ejemplo@gmail.com">
            </form>`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonColor: "var(--clr-gray)",
        confirmButtonText: 'Comprar',
        cancelButtonText: 'Cancelar',
        background: `#ffee00`,
        color: '#282828',
        allowOutsideClick: `false`,
        preConfirm: () => {
            const tarjeta = Swal.getPopup().querySelector('#tarjeta').value;
            const cvv = Swal.getPopup().querySelector('#cvv').value;
            const fecha = Swal.getPopup().querySelector('#fecha').value;

            // Puedes validar los datos ingresados aquí

            // Simulación de envío de datos de tarjeta
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 2000); // Simula un retraso de 2 segundos

            });
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Pedido Enviado',
                icon: 'success',
                iconColor: '#282828',
                text: 'Gracias por su compra. En breve llegara el recibo a su correo de e-mail',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                background: `#ffee00`,
                color: '#282828'
            });

        }
    });



    // Agregar eventos de escucha para el formato de tarjeta y fecha
    const tarjetaInput = Swal.getPopup().querySelector('#tarjeta');
    tarjetaInput.addEventListener('input', (e) => {
        const formattedValue = e.target.value.replace(/\D/g, '').replace(/(\d{4})/g, '$1-').slice(0, 19);
        e.target.value = formattedValue;
    });

    const fechaInput = Swal.getPopup().querySelector('#fecha');
    fechaInput.addEventListener('input', (e) => {
        const formattedValue = e.target.value.replace(/\D/g, '').replace(/(\d{2})(\d{2})/, '$1/$2').slice(0, 5);
        e.target.value = formattedValue;
    });

    // Evitar caracteres no numéricos en CVV
    const cvvInput = Swal.getPopup().querySelector('#cvv');
    cvvInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
    });
}



