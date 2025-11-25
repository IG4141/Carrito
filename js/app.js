// Lista de productos disponibles
const productos = [
    { nombre: "Manzana", precio: 200 },
    { nombre: "Banana", precio: 150 },
    { nombre: "Naranja", precio: 180 },
    { nombre: "Leche", precio: 900 },
    { nombre: "Pan", precio: 800 }
];

let carrito = [];

// ------------------ MOSTRAR PRODUCTOS EN LA PÁGINA ------------------
function mostrarProductos() {
    const contenedor = document.getElementById("productos-lista");
    contenedor.innerHTML = "";

    productos.forEach(p => {
        const div = document.createElement("div");
        div.classList.add("producto-card");
        div.innerHTML = `
            <h4>${p.nombre}</h4>
            <p>$${p.precio}</p>
        `;
        contenedor.appendChild(div);
    });
}

// ------------------ MOSTRAR OPCIONES EN LA VENTANA ------------------
function mostrarOpciones() {
    const lista = document.getElementById("lista-opciones");
    lista.innerHTML = "";

    productos.forEach((p, index) => {
        let opcion = document.createElement("div");
        opcion.classList.add("producto-opcion");
        opcion.textContent = `${p.nombre} - $${p.precio}`;

        opcion.onclick = () => {
            carrito.push({ ...p });
            guardar();
            mostrarCarrito();
        };

        lista.appendChild(opcion);
    });
}

// ------------------ MOSTRAR CARRITO ------------------
function mostrarCarrito() {
    const cont = document.getElementById("carrito");
    cont.innerHTML = "";
    let total = 0;

    carrito.forEach(p => {
        cont.innerHTML += `
            <div>${p.nombre} - $${p.precio}</div>
        `;
        total += p.precio;
    });

    document.getElementById("total").textContent = total;
}

// ------------------ GUARDADO LOCAL ------------------
function guardar() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// ------------------ CARGAR AL INICIAR ------------------
window.onload = () => {
    const guardado = localStorage.getItem("carrito");
    if (guardado) carrito = JSON.parse(guardado);

    mostrarProductos();
    mostrarOpciones();
    mostrarCarrito();
};

// ------------------ VACÍAR CARRITO ------------------
document.getElementById("vaciar").onclick = () => {
    carrito = [];
    guardar();
    mostrarCarrito();
};

// ------------------ VENTANA FLOTANTE ------------------
document.getElementById("abrir-menu").onclick = () => {
    document.getElementById("ventana-productos").style.display = "block";
};

document.getElementById("cerrar-menu").onclick = () => {
    document.getElementById("ventana-productos").style.display = "none";
};
