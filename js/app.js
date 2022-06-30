
const carrito = [];
const carritoEnLS = JSON.parse( localStorage.getItem('carrito') )


// DOM de productos
function renderizarProductos() {
  let tienda = document.getElementById("tienda");

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
  });
}

renderizarProductos();


// Funcion para agregar productos al carrito
function agregarProductoAlCarrito(id) {
  let producto = BASE.find((producto) => producto.id == id);

  let productoEnCarrito = carrito.find((producto) => producto.id == id);

  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
  } else {
    producto.cantidad = 1;
    carrito.push(producto);
  }

  localStorage.setItem('carrito', JSON.stringify(carrito))

  renderizarCarrito();
}

function renderizarCarrito() {
  let carritoHTML = document.getElementById("carrito");

  html = "";

  carrito.forEach((producto, id) => {
    html += `
        <div class="col-12 col-md-4 mb-5 d-flex justify-content-center">
            <div class="card text-dark" style="width: 18rem;">
                <img class="card-img-top" src="${producto.img}" alt="Card image cap">
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

function calcularTotal() {
  let total = 0;

  carrito.forEach((producto) => {
    total += producto.precio * producto.cantidad;
  });

  
  console.log(total);
}

// Funcion para eliminar productos del carrito
const eliminarProductoDelCarrito = (id) => {
  console.log(carrito[id].cantidad); 
  carrito[id].cantidad--;
  console.log(carrito[id].cantidad);

  if (carrito[id].cantidad == 0) {
    carrito.splice(id, 1);
  }

  localStorage.setItem('carrito', JSON.stringify(carrito))


  renderizarCarrito();
};



