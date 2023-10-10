# Documentación de la Aplicación de Compras en Línea Node Games (Beta)

---

# Diseño de la Página "Node Games" 🕹️

## **Cabecera y Barra de Navegación**

- **Logo**: En la parte superior de la página, se presenta un llamativo logotipo "Node Games" con un ícono en forma de nodo y el nombre de la marca. El nodo animado da un toque dinámico a la marca. 🔄

- **Menú Desplegable**: Para la versión móvil, hay un botón con tres barras horizontales que al hacer clic despliega un menú lateral. Esto proporciona una experiencia de usuario amigable en dispositivos móviles. ☰

- **Menú de Categorías**: En el menú lateral, se pueden encontrar botones que representan diferentes categorías de juegos, como acción, aventura y estrategia. Esto facilita la navegación y búsqueda de juegos por género. 🎯

- **Carrito de Compras**: También en el menú lateral, hay un botón que lleva al usuario a su carrito de compras, mostrando el número de elementos en el carrito. Esto permite una experiencia de compra rápida y sencilla. 🛒

## **Contenido Principal**

- **Título Principal**: En la sección principal de la página, se muestra un título que indica la categoría actual de juegos. Por defecto, muestra "Todos los Juegos", pero esto cambiará dinámicamente según la categoría seleccionada. Esto orienta al usuario sobre qué tipo de juegos está explorando. 📚

- **Contenedor de Productos**: En esta sección, se cargarán los juegos disponibles. Este espacio se llenará dinámicamente con la información de los juegos, lo que permite una presentación ordenada y atractiva de los productos. 🎲

## **Pie de Página**

- **Créditos y Enlaces**: En el pie de página, se encuentra la información de derechos de autor, con un toque geek al incluir un ícono de código y un enlace al perfil de LinkedIn del desarrollador. También se muestra el ícono de JavaScript, indicando que la página utiliza esta tecnología. Esto agrega un toque personal y muestra la habilidad del desarrollador. 💼

---

Este diseño de la página "Node Games" combina elementos atractivos y funcionales para proporcionar una experiencia de usuario agradable y eficiente en la búsqueda y compra de juegos en línea. El uso de íconos y animaciones sutiles agrega un toque de estilo y dinamismo al diseño. 🌟

---

# Diseño de Estilos de la Página "Node Games" 🎨

## **Estilos Globales**

- **Fuente**: Se utiliza la fuente "Rubik" de Google Fonts para el texto en todo el sitio, lo que aporta una apariencia moderna y legible.

- **Colores Personalizados**:
  - `--clr-main`: Amarillo, se utiliza como color principal para resaltar elementos importantes.
  - `--clr-main-light`: Amarillo claro, se usa como un tono suave de color principal.
  - `--clr-black`: Negro, se emplea para el texto y elementos oscuros.
  - `--clr-gray`: Gris oscuro, para detalles y elementos de fondo.
  - `--clr-red`: Rojo, utilizado para destacar precios y elementos de atención.

- **Reset CSS**: Se aplican reglas CSS de restablecimiento (`margin: 0`, `padding: 0`, `box-sizing: border-box`) a todos los elementos en la página para garantizar la coherencia en la presentación.

- **Eliminación de Estilos Predeterminados**: Se eliminan los estilos predeterminados de elementos como enlaces (`text-decoration: none`) y listas (`list-style-type: none`) para personalizar la apariencia.

## **Diseño de la Cabecera y Barra de Navegación**

- **Logo**: Se utiliza la fuente "Rubik" para el logotipo "Node Games". Se añade un icono en forma de círculo que gira (utilizando `fa-spin`) para agregar dinamismo.

- **Menú Desplegable**: Se emplea un ícono de tres barras horizontales (hamburguesa) que, al hacer clic, revela un menú lateral en la versión móvil, mejorando la usabilidad en dispositivos pequeños.

- **Menú de Categorías**: Los botones del menú lateral tienen un diseño simple con texto y un ícono circular. El botón activo se resalta con un fondo negro y sombras que le dan un aspecto tridimensional.

- **Carrito de Compras**: Se utiliza un ícono de carrito de compras con un contador para mostrar la cantidad de elementos en el carrito. El contador cambia de color para destacar cuando hay productos en el carrito.

## **Diseño del Contenido Principal**

- **Título Principal**: El título de la sección principal muestra el nombre de la categoría actual de juegos. El color amarillo lo hace destacar.

- **Contenedor de Productos**: Los juegos se presentan en una cuadrícula de 4 columnas, con espacio uniforme entre ellos. Cada juego tiene una imagen y detalles relacionados.

- **Detalles de Producto**: Los detalles del producto se muestran en un fondo amarillo claro, resaltando sobre el fondo oscuro de la sección principal. Los títulos son legibles y se utiliza un estilo en negrita para destacar la información importante.

- **Botón "Agregar al Carrito"**: El botón para agregar productos al carrito tiene un diseño elegante y simple. Al pasar el mouse, cambia de color para indicar interacción.

## **Pie de Página**

- **Créditos y Enlaces**: En el pie de página, se muestra el nombre del desarrollador, el año de creación y un enlace al perfil de LinkedIn. Además, se agrega el ícono de JavaScript para indicar la tecnología utilizada.

## **Media Queries (Diseño Responsivo)**

- Se aplican reglas de diseño responsivo para adaptar la página a diferentes tamaños de pantalla.
- En pantallas pequeñas, el menú se oculta y se muestra un botón para abrirlo.
- El diseño de la página se ajusta para optimizar la experiencia en dispositivos móviles y tabletas.

---

Este diseño de estilos de la página "Node Games" combina elementos visuales atractivos y una estructura de diseño responsivo para ofrecer una experiencia de usuario agradable en diferentes dispositivos. El uso de colores y tipografía cuidadosamente seleccionados contribuye a la estética general del sitio web. 🌟

## Descripción
Esta aplicación permite a los usuarios explorar productos, filtrarlos por categoría, agregar productos al carrito, ver detalles de productos en un popup y finalmente realizar compras. El carrito de compras permite al usuario administrar sus productos seleccionados.

## `main.js`

### Funcionalidades

🚀 **Obtener Productos desde API:**
- **Nombre de la Función:** `obtenerProductos()`
- **Descripción:** Esta función realiza una solicitud HTTP fetch para obtener datos de productos desde una API y los almacena en la variable `productos`.
- **Cómo Utilizar:** Llama a esta función al cargar la página para obtener los productos.

🔍 **Mostrar Productos:**
- **Nombre de la Función:** `cargarProductos(productosElegidos)`
- **Descripción:** Carga productos en el contenedor del DOM según la categoría seleccionada.
- **Cómo Utilizar:** Llama a esta función para mostrar productos en el contenedor.

🔎 **Filtrar por Categoría:**
- **Nombre de la Función:** Evento de clic en botones de categoría
- **Descripción:** Los botones de categoría permiten filtrar productos por su categoría.
- **Cómo Utilizar:** Haz clic en los botones de categoría para filtrar los productos.

🛒 **Agregar al Carrito:**
- **Nombre de la Función:** `agregarAlCarrito(e)`
- **Descripción:** Agrega un producto al carrito y actualiza el contador de productos en el carrito.
- **Cómo Utilizar:** Haz clic en "Agregar al carrito" en el popup del producto.

👛 **Carrito de Compras:**
- **Nombre de la Función:** `actualizarNumerito()`
- **Descripción:** Actualiza dinámicamente el contador de productos en el carrito.
- **Cómo Utilizar:** Se llama automáticamente cuando se agrega un producto al carrito.

🎉 **Popup de Producto:**
- **Nombre de la Función:** `mostrarPopUp()`
- **Descripción:** Muestra un popup con detalles del producto al hacer clic en un producto.
- **Cómo Utilizar:** Se llama automáticamente al hacer clic en un producto.

## `carrito.js`

### Funcionalidades

🛒 **Cargar Productos en el Carrito:**
- **Nombre de la Función:** `cargarProductosCarrito()`
- **Descripción:** Carga productos previamente seleccionados en el carrito desde el almacenamiento local y actualiza la vista del carrito.
- **Cómo Utilizar:** Llama a esta función al cargar la página para cargar los productos en el carrito.

🗑️ **Eliminar Producto del Carrito:**
- **Nombre de la Función:** `eliminarDelCarrito(e)`
- **Descripción:** Permite al usuario eliminar un producto específico del carrito y muestra un mensaje de confirmación.
- **Cómo Utilizar:** Haz clic en el botón de eliminar junto al producto en el carrito.

🚮 **Vaciar el Carrito:**
- **Nombre de la Función:** `vaciarCarrito()`
- **Descripción:** Permite al usuario vaciar completamente el carrito y muestra un mensaje de confirmación.
- **Cómo Utilizar:** Haz clic en el botón "Vaciar Carrito" en la vista del carrito.

💰 **Comprar Carrito:**
- **Nombre de la Función:** `comprarCarrito()`
- **Descripción:** Permite al usuario finalizar la compra, eliminando todos los productos del carrito y mostrando un mensaje de éxito.
- **Cómo Utilizar:** Haz clic en el botón "Comprar" en la vista del carrito.

## Elementos del DOM

### `main.js`
- `#contenedor-productos`: Contenedor para mostrar los productos.
- `.boton-categoria`: Botones para filtrar productos por categoría.
- `#titulo-principal`: Título principal de la página.
- `.producto-agregar`: Botones para agregar productos al carrito.
- `#numerito`: Contador dinámico para mostrar la cantidad de productos en el carrito.

### `carrito.js`
- `#carrito-vacio`: Contenedor para mostrar un mensaje cuando el carrito está vacío.
- `#carrito-productos`: Contenedor para mostrar los productos en el carrito.
- `#carrito-acciones`: Contenedor para mostrar acciones como vaciar el carrito y comprar.
- `#carrito-comprado`: Contenedor para mostrar un mensaje después de realizar la compra.
- `.carrito-producto-eliminar`: Botones para eliminar productos individuales.
- `#carrito-acciones-vaciar`: Botón para vaciar completamente el carrito.
- `#total`: Contenedor para mostrar el total de la compra.
- `#carrito-acciones-comprar`: Botón para finalizar la compra.

## Dependencias Externas
- `Swal.fire()`: Utilizado para mostrar mensajes de confirmación al vaciar el carrito y para mostrar informacion detallada de cada juego.
- `Animate.css`: Utilizado para personalizar la entrada y salida de popups mediante animaciones css.
- `Font Awesome`: Utilizado para mostrar iconos.

---

Esta documentación proporciona una guía completa para comprender y utilizar la aplicación de Node Games. Asegúrate de configurar adecuadamente los elementos del DOM y las dependencias externas para un funcionamiento correcto.