const productos = [
  {
    id:1,
    nombre:"Street 26 Complete",
    categoria:"bicicletas",
    precio:749900,
    icono:"🚲",
    badge:"DESTACADO",
    stock:true
  },
  {
    id:2,
    nombre:"Street Pro 26",
    categoria:"bicicletas",
    precio:899900,
    icono:"🚲",
    badge:"NUEVO",
    stock:true
  },
  {
    id:3,
    nombre:"Shimano MT200",
    categoria:"frenos",
    precio:69900,
    icono:"🛑",
    badge:"TOP",
    stock:true
  },
  {
    id:4,
    nombre:"Rotor 160 mm",
    categoria:"frenos",
    precio:24900,
    icono:"⭕",
    badge:"",
    stock:true
  },
  {
    id:5,
    nombre:"Wheelset Street 26",
    categoria:"ruedas",
    precio:189900,
    icono:"⚙️",
    badge:"",
    stock:true
  },
  {
    id:6,
    nombre:"Cubierta Street 26 x 2.40",
    categoria:"ruedas",
    precio:59900,
    icono:"⭕",
    badge:"RESTOCK",
    stock:true
  },
  {
    id:7,
    nombre:"Cadena KMC 7/8 Speed",
    categoria:"transmision",
    precio:34900,
    icono:"⛓️",
    badge:"",
    stock:true
  },
  {
    id:8,
    nombre:"Pedales Platform",
    categoria:"transmision",
    precio:42900,
    icono:"⚙️",
    badge:"",
    stock:true
  },
  {
    id:9,
    nombre:"Stem Street 35",
    categoria:"cockpit",
    precio:59900,
    icono:"🔩",
    badge:"",
    stock:true
  },
  {
    id:10,
    nombre:"Manubrio Street Rise",
    categoria:"cockpit",
    precio:79900,
    icono:"〰️",
    badge:"NUEVO",
    stock:true
  },
  {
    id:11,
    nombre:"Puños Lock-On",
    categoria:"cockpit",
    precio:24900,
    icono:"⚫",
    badge:"",
    stock:true
  },
  {
    id:12,
    nombre:"Maza Trasera Street",
    categoria:"ruedas",
    precio:89900,
    icono:"⚙️",
    badge:"",
    stock:true
  }
];

let carrito = [];
let categoriaActual = "todos";

const grid = document.getElementById("productsGrid");

function mostrarProductos(lista){

  grid.innerHTML = "";

  if(lista.length === 0){

    grid.innerHTML = `
      <p style="
        color:#777;
        grid-column:1/-1;
        padding:50px 0;
      ">
        No encontramos productos.
      </p>
    `;

    return;
  }

  lista.forEach(p=>{

    grid.innerHTML += `
      <article class="product">

        <div class="product-image">

          ${
            p.badge
            ? `<span class="product-badge">${p.badge}</span>`
            : ""
          }

          ${p.icono}

        </div>

        <div class="product-info">

          <span class="product-category">
            ${p.categoria.toUpperCase()}
          </span>

          <h3>${p.nombre}</h3>

          <div class="stock">
            ● EN STOCK
          </div>

          <div class="product-bottom">

            <div class="price">
              <strong>${precio(p.precio)}</strong>
              <span>
                Precio demostrativo
              </span>
            </div>

            <button
              class="add"
              onclick="agregar(${p.id})">
              +
            </button>

          </div>

        </div>

      </article>
    `;
  });
}


function filtrar(categoria,boton){

  categoriaActual=categoria;

  document.querySelectorAll(".filter")
    .forEach(b=>b.classList.remove("active"));

  boton.classList.add("active");

  aplicarFiltros();
}


function seleccionarCategoria(categoria){

  categoriaActual=categoria;

  document
    .getElementById("productos")
    .scrollIntoView();

  document.querySelectorAll(".filter")
    .forEach(b=>{

      b.classList.remove("active");

      if(
        b.textContent.trim().toLowerCase()
        === categoria
      ){
        b.classList.add("active");
      }

    });

  aplicarFiltros();
}


function buscarProductos(){
  aplicarFiltros();
}


function aplicarFiltros(){

  const texto=
    document
    .getElementById("busqueda")
    .value
    .toLowerCase();

  const resultado=productos.filter(p=>{

    const categoriaOK=
      categoriaActual==="todos" ||
      p.categoria===categoriaActual;

    const busquedaOK=
      p.nombre.toLowerCase().includes(texto) ||
      p.categoria.toLowerCase().includes(texto);

    return categoriaOK && busquedaOK;

  });

  mostrarProductos(resultado);
}


function agregar(id){

  const producto=
    productos.find(p=>p.id===id);

  const existente=
    carrito.find(p=>p.id===id);

  if(existente){
    existente.cantidad++;
  }
  else{
    carrito.push({
      ...producto,
      cantidad:1
    });
  }

  actualizarCarrito();
  toast("Producto agregado ✓");
}


function cambiarCantidad(id,cambio){

  const item=
    carrito.find(p=>p.id===id);

  if(!item)return;

  item.cantidad+=cambio;

  if(item.cantidad<=0){
    carrito=
      carrito.filter(p=>p.id!==id);
  }

  actualizarCarrito();
}


function actualizarCarrito(){

  const contenedor=
    document.getElementById(
      "carritoProductos"
    );

  const cantidad=
    carrito.reduce(
      (t,p)=>t+p.cantidad,
      0
    );

  document.getElementById(
    "cantidadCarrito"
  ).textContent=cantidad;


  if(carrito.length===0){

    contenedor.innerHTML=`
      <div class="empty">
        <div style="font-size:50px">
          🛒
        </div>

        <h3 style="margin:15px 0">
          TU CARRITO ESTÁ VACÍO
        </h3>

        <p>
          Agregá productos para comenzar.
        </p>
      </div>
    `;

    document.getElementById(
      "total"
    ).textContent="$0";

    return;
  }


  contenedor.innerHTML="";

  carrito.forEach(p=>{

    contenedor.innerHTML+=`
      <div class="cart-item">

        <div class="cart-item-icon">
          ${p.icono}
        </div>

        <div>

          <h4>${p.nombre}</h4>

          <p>${precio(p.precio)}</p>

          <div class="qty">

            <button
              onclick="cambiarCantidad(${p.id},-1)">
              −
            </button>

            <span>${p.cantidad}</span>

            <button
              onclick="cambiarCantidad(${p.id},1)">
              +
            </button>

          </div>

        </div>

        <strong>
          ${precio(p.precio*p.cantidad)}
        </strong>

      </div>
    `;
  });


  const total=
    carrito.reduce(
      (t,p)=>t+p.precio*p.cantidad,
      0
    );

  document.getElementById(
    "total"
  ).textContent=precio(total);
}


function abrirCarrito(){

  document
    .getElementById("carrito")
    .classList.add("open");

  document
    .getElementById("overlay")
    .classList.add("show");

  document.body.style.overflow="hidden";
}


function cerrarCarrito(){

  document
    .getElementById("carrito")
    .classList.remove("open");

  document
    .getElementById("overlay")
    .classList.remove("show");

  document.body.style.overflow="";
}


function finalizarCompra(){

  if(carrito.length===0){

    toast(
      "Agregá algún producto primero"
    );

    return;
  }

  let texto=
    "Hola STUNT LAB! Quiero consultar por:%0A%0A";

  carrito.forEach(p=>{

    texto+=
      `${p.cantidad}x ${p.nombre} - `+
      `${precio(p.precio*p.cantidad)}%0A`;

  });


  const total=
    carrito.reduce(
      (t,p)=>t+p.precio*p.cantidad,
      0
    );

  texto+=
    `%0ATotal demostrativo: ${precio(total)}`;


  /*
    REEMPLAZAR POR EL NÚMERO REAL
    DEL NEGOCIO.

    Formato:
    código de país + área + número

    SIN "+" NI ESPACIOS.
  */

  const whatsapp="5491100000000";

  window.open(
    `https://wa.me/${whatsapp}?text=${texto}`,
    "_blank"
  );
}


function precio(numero){

  return numero.toLocaleString(
    "es-AR",
    {
      style:"currency",
      currency:"ARS",
      maximumFractionDigits:0
    }
  );

}


function toast(mensaje){

  const t=
    document.getElementById("toast");

  t.textContent=mensaje;

  t.classList.add("show");

  setTimeout(()=>{
    t.classList.remove("show");
  },1800);
}


function focusBusqueda(){

  document
    .getElementById("productos")
    .scrollIntoView();

  setTimeout(()=>{

    document
      .getElementById("busqueda")
      .focus();

  },500);
}


function suscribirse(event){

  event.preventDefault();

  toast("¡Gracias por suscribirte!");

  document
    .getElementById("email")
    .value="";
}


mostrarProductos(productos);
actualizarCarrito();
