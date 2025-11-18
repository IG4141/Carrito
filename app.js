// Esperamos a que todo el contenido del DOM esté cargado para ejecutar nuestro código
document.addEventListener('DOMContentLoaded', () => {

    // --- DATOS INICIALES ---
    const productos = [
        { id: 1, nombre: 'Laptop Pro', precio: 1200.00 },
        { id: 2, nombre: 'Mouse Gamer', precio: 45.50 },
        { id: 3, nombre: 'Teclado Mecánico', precio: 89.99 },
        { id: 4, nombre: 'Monitor 27"', precio: 300.00 }
    ];

    // --- PERSISTENCIA (LOCAL STORAGE) ---
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Referencias a los elementos del DOM
    const divProductos = document.getElementById('productos');
    const ulCarrito = document.getElementById('carrito');
    const spanTotal = document.getElementById('total');
    const botonVaciar = document.getElementById('vaciarCarrito');

    // --- FUNCIONES DE GESTIÓN DEL CARRITO ---

    function guardarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function agregarAlCarrito(idProducto) { // <-- CAMBIO: Ahora recibe solo el ID
        const productoAAgregar = productos.find(p => p.id === idProducto);
        if (productoAAgregar) {
            const itemExistente = carrito.find(item => item.id === idProducto);
            if (itemExistente) {
                itemExistente.cantidad++;
            } else {
                carrito.push({ ...productoAAgregar, cantidad: 1 });
            }
            mostrarCarrito();
        }
    }

    function modificarCantidad(id, nuevaCantidad) {
        nuevaCantidad = parseInt(nuevaCantidad);
        const item = carrito.find(item => item.id === id);
        if (item) {
            if (nuevaCantidad > 0) {
                item.cantidad = nuevaCantidad;
            } else {
                eliminarDelCarrito(id);
                return;
            }
        }
        mostrarCarrito();
    }

    function eliminarDelCarrito(id) {
        carrito = carrito.filter(item => item.id !== id);
        mostrarCarrito();
    }

    function vaciarCarrito() {
        carrito = [];
        mostrarCarrito();
    }

    // --- FUNCIONES DE RENDERIZADO ---

    function renderizarProductos() {
        divProductos.innerHTML = ''; // Limpiamos antes de renderizar
        productos.forEach(producto => {
            const col = document.createElement('div');
            col.className = 'col-md-4';
            // <-- CAMBIO: Usamos un atributo data-* para guardar el ID y quitamos el onclick
            col.innerHTML = `
                <div class="card h-100">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <div>
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text">$${producto.precio.toFixed(2)}</p>
                        </div>
                        <button class="btn btn-primary mt-2 agregar-btn" data-id="${producto.id}">Agregar al Carrito</button>
                    </div>
                </div>
            `;
            divProductos.appendChild(col);
        });
    }

    function mostrarCarrito() {
        ulCarrito.innerHTML = '';
        let total = 0;

        if (carrito.length === 0) {
            ulCarrito.innerHTML = '<li class="list-group-item">El carrito está vacío.</li>';
        } else {
            carrito.forEach(item => {
                const subtotal = item.precio * item.cantidad;
                total += subtotal;

                const li = document.createElement('li');
                li.className = 'list-group-item';
                // <-- CAMBIO: Usamos atributos data-* y clases para identificar los elementos
                li.innerHTML = `
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <span>${item.nombre}</span>
                            <span class="badge bg-secondary rounded-pill ms-2">$${item.precio.toFixed(2)} x ${item.cantidad}</span>
                        </div>
                        <div>
                            <input type="number" value="${item.cantidad}" min="0" class="form-control d-inline-block cantidad-input" style="width: 70px;" data-id="${item.id}">
                            <button class="btn btn-danger btn-sm ms-2 eliminar-btn" data-id="${item.id}">Eliminar</button>
                        </div>
                    </div>
                `;
                ulCarrito.appendChild(li);
            });
        }
        spanTotal.textContent = total.toFixed(2);
        guardarCarrito();
    }

    // --- INICIALIZACIÓN Y MANEJO DE EVENTOS ---

    renderizarProductos();
    mostrarCarrito();

    botonVaciar.addEventListener('click', vaciarCarrito);

    // <-- CAMBIO: Usamos delegación de eventos para los productos
    divProductos.addEventListener('click', (e) => {
        // Verificamos si el elemento clicado es un botón con la clase 'agregar-btn'
        if (e.target.classList.contains('agregar-btn')) {
            const idProducto = parseInt(e.target.dataset.id); // Obtenemos el ID del atributo data-id
            agregarAlCarrito(idProducto);
        }
    });

    // <-- CAMBIO: Usamos delegación de eventos para los ítems del carrito
    ulCarrito.addEventListener('click', (e) => {
        // Si se clicó en un botón de eliminar
        if (e.target.classList.contains('eliminar-btn')) {
            const idProducto = parseInt(e.target.dataset.id);
            eliminarDelCarrito(idProducto);
        }
    });

    // Para el input, el evento es 'change'
    ulCarrito.addEventListener('change', (e) => {
        // Si se cambió el valor de un input de cantidad
        if (e.target.classList.contains('cantidad-input')) {
            const idProducto = parseInt(e.target.dataset.id);
            const nuevaCantidad = e.target.value;
            modificarCantidad(idProducto, nuevaCantidad);
        }
    });

});