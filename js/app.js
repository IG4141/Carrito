// LISTA DE PRODUCTOS
const productos = [
    { id: 1, nombre: "camiseta", precio: 20, cantidad: 1 },
    { id: 2, nombre: "pantalon", precio: 35, cantidad: 1 },
    { id: 3, nombre: "zapatillas", precio: 50, cantidad: 1 }
];

let carrito = [];

// CONTENEDOR DONDE IRÁN LOS BOTONES DE PRODUCTOS
const contenedor = document.getElementById("productos-lista");

// Crear botones para agregar productos
productos.forEach(prod => {
    const btn = document.createElement("button");
    btn.textContent = `Agregar ${prod.nombre} - $${prod.precio}`;
    btn.onclick = () => agregaralcarrito(prod);
    contenedor.appendChild(btn);
});


// AGREGAR AL CARRITO
function agregaralcarrito(producto) {
    const existe = carrito.find(p => p.id === producto.id);
    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({ ...producto }); 
    }
    guardar();
    mostrarcarrito();
}


// MOSTRAR CARRITO
function mostrarcarrito() {
    const lista = document.getElementById("carrito");
    lista.innerHTML = "";
    let total = 0;

    carrito.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.nombre} - $${item.precio} x${item.cantidad} `;

        // Input cantidad
        const inputcantidad = document.createElement("input");
        inputcantidad.type = "number";
        inputcantidad.value = item.cantidad;
        inputcantidad.min = 1;
        inputcantidad.onchange = (e) =>
            modificarlacantidad(item.id, parseInt(e.target.value));

        // Botón eliminar
        const btneliminar = document.createElement("button");
        btneliminar.textContent = "❌";
        btneliminar.onclick = () => eliminarcarrito(item.id);

        li.appendChild(inputcantidad);
        li.appendChild(btneliminar);
        lista.appendChild(li);

        total += item.precio * item.cantidad;
    });

    document.getElementById("total").textContent = total;
}


// ELIMINAR PRODUCTO
function eliminarcarrito(id) {
    carrito = carrito.filter(p => p.id !== id);
    guardar();
    mostrarcarrito();
}


// MODIFICAR CANTIDAD
function modificarlacantidad(id, nuevacantidad) {
    const item = carrito.find(p => p.id === id);
    if (!item) return;

    if (nuevacantidad > 0) {
        item.cantidad = nuevacantidad;
    } else {
        eliminarcarrito(id);
    }
    guardar();
    mostrarcarrito();
}


// GUARDAR EN LOCALSTORAGE
function guardar() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}


// CARGAR CARRITO GUARDADO
carrito = JSON.parse(localStorage.getItem("carrito")) || [];
mostrarcarrito();
