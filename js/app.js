//Variables
const productos =[
    {id: 1, nombre: "camiseta", precio:20},
    {id: 2, nombre: "pantalon", precio:35},
    {id: 3, nombre: "zapatillas", precio:50}
];
let carrito= [];
const contenedor = document.getElementById(productos);
productos.forEach(prod =>{
    const btn = document.createElement("botton");
    btn.textContent='agregr ${prod.nombre} - $${prod.precio}';
    btn.onclick = () => agregaralcarrito(prod);
    contenedor.appendChild(btn);
});
function agregaralcarrito(producto){
    carrito.push(producto);
    mostrarcarrito();
}

function mostrarcarrito(producto){
    const lista = document.getElementById("carrito");
    lista.innerHTML ="";
    let total = 0;

    carrito.forEach(item=> {
        const li = document.createElement("li");
        li.textContent='${item.nombre} - {item.precio}';
        lista.appendChild(li);
        total += item.precio;

        const btneliminar= document.createElement("botton");
        btneliminar.textContent="❌";
        btneliminar.onclick = () => eliminarcarrito(item.id);

        const inputcantidad= document.createElement("input");
        inputcantidad.type = "number";
        inputcantidad.value = item.cantidad;
        inputcantidad.min = 1;
        inputcantidad.onchange = (e) => modificarlacantidad(item.id, parseInt(e.target.value));

        li.appendChild(inputcantidad);
        li.appendChild(btneliminar);
        lista.appendChild(li);

        total += item.precio * item.cantidad;

    });
    

    document.getElementById("total").textContent =  total;
}
localStorage.setItem("carrito", JSON.stringify(carrito));
carrito = JSON.parse(localStorage.getItem(carrito)) || [];

function eliminarcarrito(id){ 
    carrito = carrito.filter(p => p.id !== id);
    mostrarcarrito();
}
function modificarlacantidad(id, nuevacantidad){
    const item= carrito.find(p => p.id === id);
    if (item){
        if (nuevacantidad > 0){
            item.cantidad = nuevacantidad;
        }else{
            eliminarcarrito(id);
        }
        mostrarcarrito();
    }
}
let total = 0;
carrito.forEach(item =>{
    total+= item.precio * item.cantidad;
});
document.getElementById("total").textContent= total; 