let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");


function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
        contenedorCarritoProductos.innerHTML = "";
    
        productosEnCarrito.forEach(producto => {
    
            const section = document.createElement("section");
            section.classList.add("carrito-producto");
            section.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <section class="carrito-producto-titulo">
                    <small>Título</small>
                    <h3>${producto.titulo}</h3>
                </section>
                <section class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                    <button id="agregarCantidad" class="botones-cantidad">+</button>
                    <button id="restarCantidad" class="botones-cantidad">-</button>
                </section>
                <section class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </section>
                <section class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </section>
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="fa-solid fa-trash"></i></button>
            `;
            const botonAgregarCantidad = section.querySelector("#agregarCantidad");
            const botonRestarCantidad = section.querySelector("#restarCantidad");

            botonAgregarCantidad.addEventListener("click", () => {
                producto.cantidad++; // Incrementar la cantidad en 1
                cargarProductosCarrito(); // Actualizar la vista del carrito
            });

            botonRestarCantidad.addEventListener("click", () => {
                if (producto.cantidad > 1) {
                    producto.cantidad--; // Restar la cantidad en 1, mínimo 1
                    cargarProductosCarrito(); // Actualizar la vista del carrito
                }
            });
    
            contenedorCarritoProductos.append(section);
        })
    
    actualizarBotonesEliminar();
    actualizarTotal();
	
    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }

}

cargarProductosCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'El producto se ha eliminado del carrito',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
    });

    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    
    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {

    Swal.fire({
        title: '¿Estás seguro?',
        icon: 'question',
        html: `Se van a borrar ${productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos.`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonColor:"var(--clr-gray)",
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            cargarProductosCarrito();
        }
      })
}


function formatearNumeroConPunto(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    const totalFormateado = formatearNumeroConPunto(totalCalculado);
    total.innerText = `$${totalFormateado}`;
}

botonComprar.addEventListener("click", comprarCarrito);




function comprarCarrito() {
    Swal.fire({
        title: 'Pedido de Tarjeta de Crédito',
        imageUrl: "./img/tarjeta.svg",
        imageWidth: "200px",
        html: 'Por favor, ingrese los detalles de su tarjeta de crédito:' + 
            '<input type="text" id="tarjeta" class="swal2-input" placeholder="Número de tarjeta" >' +
            '<input type="text" id="cvv" class="swal2-input" placeholder="CVV">' +
            '<input type="text" id="fecha" class="swal2-input" placeholder="Vencimiento (MM/YY)">',
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonColor: "var(--clr-gray)",
        confirmButtonText: 'Comprar',
        cancelButtonText: 'Cancelar',
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
                text: 'Gracias por su compra. En breve llegara el recibo a su correo de e-mail',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

            contenedorCarritoVacio.classList.add("disabled");
            contenedorCarritoProductos.classList.add("disabled");
            contenedorCarritoAcciones.classList.add("disabled");
            contenedorCarritoComprado.classList.remove("disabled");
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


