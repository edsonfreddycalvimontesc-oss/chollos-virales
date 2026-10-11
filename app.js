"use strict";

/* =================================
   LISTA DE PRODUCTOS DE EJEMPLO
================================= */

const productos = [
    {
        id: 1,
        nombre: "Auriculares inalámbricos",
        categoria: "Tecnología",
        imagen: "https://placehold.co/600x400/e8f5ed/123d2b?text=Auriculares",
        precio: "Consultar precio",
        descripcion: "Auriculares para escuchar música y atender llamadas.",
        tienda: "Amazon",
        enlace: ""
    },
    {
        id: 2,
        nombre: "Soporte para teléfono móvil",
        categoria: "Tecnología",
        imagen: "https://placehold.co/600x400/e8f5ed/123d2b?text=Soporte+movil",
        precio: "Consultar precio",
        descripcion: "Un soporte práctico para colocar el móvil en tu escritorio.",
        tienda: "Amazon",
        enlace: ""
    },
    {
        id: 3,
        nombre: "Organizador para el hogar",
        categoria: "Hogar",
        imagen: "https://placehold.co/600x400/f9eee3/60442d?text=Organizador",
        precio: "Consultar precio",
        descripcion: "Una solución sencilla para mantener tus objetos ordenados.",
        tienda: "Amazon",
        enlace: ""
    },
    {
        id: 4,
        nombre: "Lámpara decorativa LED",
        categoria: "Hogar",
        imagen: "https://placehold.co/600x400/f9eee3/60442d?text=Lampara+LED",
        precio: "Consultar precio",
        descripcion: "Iluminación decorativa para crear un ambiente agradable.",
        tienda: "Amazon",
        enlace: ""
    },
    {
        id: 5,
        nombre: "Rodillo facial de masaje",
        categoria: "Belleza",
        imagen: "https://placehold.co/600x400/f8e8ef/783c56?text=Rodillo+facial",
        precio: "Consultar precio",
        descripcion: "Accesorio de cuidado personal para incorporar a tu rutina.",
        tienda: "Amazon",
        enlace: ""
    },
    {
        id: 6,
        nombre: "Organizador de maquillaje",
        categoria: "Belleza",
        imagen: "https://placehold.co/600x400/f8e8ef/783c56?text=Maquillaje",
        precio: "Consultar precio",
        descripcion: "Organiza tus productos de belleza y tenlos a mano.",
        tienda: "Amazon",
        enlace: ""
    }
];


/* =================================
   ELEMENTOS DE LA PÁGINA
================================= */

const zonaProductos = document.getElementById("productos");
const buscador = document.getElementById("busqueda");
const mensajeVacio = document.getElementById("sin-resultados");
const botonesFiltro = document.querySelectorAll(".filtro");

let categoriaActual = "Todos";


/* =================================
   COMPROBAR ENLACES
================================= */

// Solo aceptamos enlaces web seguros con https://.
function enlaceValido(enlace) {
    try {
        const url = new URL(enlace);

        return url.protocol === "https:";
    } catch {
        return false;
    }
}


/* =================================
   CREAR UNA TARJETA DE PRODUCTO
================================= */

function crearTarjeta(producto) {
    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta";

    const imagen = document.createElement("img");
    imagen.className = "imagen-producto";
    imagen.src = producto.imagen;
    imagen.alt = producto.nombre;
    imagen.loading = "lazy";

    // Imagen alternativa si la original no se puede cargar.
    imagen.addEventListener("error", () => {
        imagen.src =
            "https://placehold.co/600x400/f0f0f0/555555?text=Imagen+no+disponible";

        imagen.onerror = null;
    });

    const contenido = document.createElement("div");
    contenido.className = "contenido-tarjeta";

    const categoria = document.createElement("span");
    categoria.className = "categoria";
    categoria.textContent = producto.categoria;

    const nombre = document.createElement("h3");
    nombre.className = "nombre-producto";
    nombre.textContent = producto.nombre;

    const descripcion = document.createElement("p");
    descripcion.className = "descripcion";
    descripcion.textContent = producto.descripcion;

    const precio = document.createElement("p");
    precio.className = "precio";
    precio.textContent = producto.precio;

    contenido.append(categoria, nombre, descripcion, precio);

    if (enlaceValido(producto.enlace)) {
        const boton = document.createElement("a");

        boton.className = "comprar";
        boton.href = producto.enlace;
        boton.target = "_blank";
        boton.rel = "sponsored nofollow noopener";
        boton.textContent = `Ver en ${producto.tienda}`;

        contenido.appendChild(boton);
    } else {
        const boton = document.createElement("button");

        boton.className = "comprar pendiente";
        boton.type = "button";
        boton.disabled = true;
        boton.textContent = "Enlace pendiente";

        contenido.appendChild(boton);
    }

    tarjeta.append(imagen, contenido);

    return tarjeta;
}


/* =================================
   MOSTRAR Y FILTRAR PRODUCTOS
================================= */

function mostrarProductos() {
    const texto = buscador.value.trim().toLocaleLowerCase("es");

    const filtrados = productos.filter((producto) => {
        const contenido =
            `${producto.nombre} ${producto.descripcion} ${producto.categoria}`
                .toLocaleLowerCase("es");

        const coincideTexto = contenido.includes(texto);

        const coincideCategoria =
            categoriaActual === "Todos" ||
            producto.categoria === categoriaActual;

        return coincideTexto && coincideCategoria;
    });

    // Limpiar los resultados anteriores.
    zonaProductos.replaceChildren();

    // Crear y mostrar las tarjetas.
    filtrados.forEach((producto) => {
        zonaProductos.appendChild(crearTarjeta(producto));
    });

    // Mostrar un aviso si no hay resultados.
    mensajeVacio.hidden = filtrados.length !== 0;
}


/* =================================
   EVENTOS DE LOS FILTROS
================================= */

botonesFiltro.forEach((boton) => {
    boton.addEventListener("click", () => {
        categoriaActual = boton.dataset.categoria;

        // Actualizar el aspecto del filtro seleccionado.
        botonesFiltro.forEach((otroBoton) => {
            const seleccionado = otroBoton === boton;

            otroBoton.classList.toggle("activo", seleccionado);
            otroBoton.setAttribute(
                "aria-pressed",
                String(seleccionado)
            );
        });

        mostrarProductos();
    });

    boton.setAttribute(
        "aria-pressed",
        String(boton.classList.contains("activo"))
    );
});


/* =================================
   EVENTO DEL BUSCADOR
================================= */

buscador.addEventListener("input", mostrarProductos);


/* =================================
   INICIAR LA PÁGINA
================================= */

mostrarProductos();