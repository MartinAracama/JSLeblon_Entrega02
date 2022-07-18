
let carrito = [];
const carritoEnLS = JSON.parse(localStorage.getItem("carrito")) || [];

Swal.fire("Bienvenido a Leblon Burgers!! - Hace tu pedido!")
 
// DOM de productos

BASE = [] // Aca se copiará lo qu está en el .json

fetch("../BASE.json")
    .then((resp) => resp.json())
    .then((data) => {
      BASE = data // se copia en el arreglo BASE lo que viene desde data
      renderizarProductos()
      renderizarCarrito()
    }),
    console.log(BASE)

function renderizarProductos() { // no se recibe nada porque se accede al arreglo ]BASE
    const tienda = document.querySelector("#tienda");
      
      BASE.forEach((e) => {
        let productoHTML = `
            <div class="col-12 col-md-4 mb-5 d-flex justify-content-center">
            <div class="card text-dark" style="width: 18rem;">
                <img class="card-img-top" src="${e.img}" alt="Card image cap">
                 <div class="card-body">
                    <h5 class="card-title">${e.nombre}</h5>
                    <p class="card-text">${e.descripcion}</p>
                    <p>$${e.precio}</p>
                     <button class="btn btn-primary" onClick="agregarProductoAlCarrito(${e.id})">Añadir al carrito</button>
                 </div>
            </div>
             </div>
             `;
        tienda.innerHTML += productoHTML;
       })
      }
    
renderizarProductos();

// Funcion para agregar productos al carrito
function agregarProductoAlCarrito(id) {
  let producto = BASE.find((producto) => producto.id == id);
  
    // TOASTIFY  
      Toastify({
        text: `Agregaste una ${producto.nombre} a tu orden`,
        duration: 3500,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, 
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){} // Callback after click
      }).showToast();

  let productoEnCarrito = carrito.find((producto) => producto.id == id);

  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
  } else {
    producto.cantidad = 1;
    carrito.push(producto);
  }
  
  
  localStorage.setItem("carrito", JSON.stringify(carrito));

  renderizarCarrito();
  }

function renderizarCarrito() {
  let carritoHTML = document.getElementById("carrito");

  html = "";

  carrito.forEach((producto, id) => {
    html += `
        <div class="col-12 col-md-4 mb-5 d-flex justify-content-center">
            <div class="card text-dark" style="width: 18rem;">
                <img class="card-img-top" src="${producto.img}" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p>$${producto.precio}</p>
                    <p>Cantidad: ${producto.cantidad}</p>
                    <button class="btn btn-danger" onClick="eliminarProductoDelCarrito(${id})">Eliminar</button>
                </div>
            </div>
        </div>
        `;
  });

  carritoHTML.innerHTML = html;

  calcularTotal();
}

// Cálculo del total
function calcularTotal() {
  let total = 0;

    carrito.forEach((producto) => {
      total += producto.precio * producto.cantidad;
    });

    total.innerHTML = html;
    console.log(total);

    // SweetAlert: boton "cuanto es" flotante sobre la izquierda. Al clikear muestra el importe total del carrito
    const btnSwall = document.querySelector('#total')

    btnSwall.addEventListener("click", () => {

      Swal.fire({
        title: `El total es $ ${total}`,
      })
    })
}

// Funcion para eliminar productos del carrito
const eliminarProductoDelCarrito = (id) => {
  
  // // TOASTIFY  
  Toastify({
    text: `eliminaste un producto de tu orden`,
    duration: 3000,
    gravity: "top", 
    position: "right", 
    stopOnFocus: true, 
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function(){} // Callback after click
  }).showToast();
  
  console.log(carrito[id].cantidad);
  carrito[id].cantidad--;
  console.log(carrito[id].cantidad);
  
  if (carrito[id].cantidad == 0) {
    carrito.splice(id, 1);
  }
  
  
  localStorage.setItem("carrito", JSON.stringify(carrito));
  
  renderizarCarrito();
};

