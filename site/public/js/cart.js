window.addEventListener('load', () => {

    const qs = (tag) => {
        return document.querySelector(tag)
    }

    const botonEliminar = qs('.eliminar');
    const form = qs(".deleteForm")
    const seccionMonto = qs(".monto_final") 
    const precio = qs(".precio") 
    const articleProducto = qs(".product_info")
    const cartContainer = qs(".container")
    var subtotal = 0;

    const eliminarProducto = (id) =>{

        fetch(`http://localhost:3000/api/cart/delete/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data =>{
            console.log(data);
            listarProductos();
        })
        .catch(error=>console.log(error))

    }
    
    const listarProductos =() =>{
        
        fetch("http://localhost:3000/api/cart")
        .then(response => response.json())
        .then(result =>{
            /* console.log(result.data); */
                if (result.data.length) {
                    cartContainer.innerHTML= `<div class="info_cart">
                    <h2>Artículo</h2>
                    <h2>Monto</h2>
                </div>`

                result.data.forEach(carrito=>{
                    
                    cartContainer.innerHTML += `<article class="product_info">
                    <div class="foto_product">
                    <a href="#" target="blank"><img src="/img/productos/${carrito.carritoProducto.imagen[0].nombre}" alt=""></a>
                    
                        <button id="${ carrito.carritoProducto.id}" class="eliminar"  onclick="eliminarProducto(${carrito.carritoProducto.id})">Eliminar<i class="fas fa-trash trash"></i></button>
                  
                    <p class="modelo_article"></p>
                </div>
                <div class="detail_product">
                    <div class="detail_article_cart">
                        <h4 class="tittle_article">${carrito.carritoProducto.nombre}</h4>
                    </div>
                    <div class="cantidad_container">
                        <div class="box_quantity">
                            <button class="sumaResta">-</button>
                            <form action="/user/cart/changeQuantity/${carrito.carritoProducto.id}?_method=PUT" method="POST">
                                <input type="number" name="cantidad" value="${carrito.cantidad}" class="quantity" min="0">
                                <button type="submit" id="cambiarCantidad">Cambiar</button>
                            </form>
                            <button class="sumaResta">+</button>
                        </div>
                        <!-- <p class="stock">5 disponibles</p> -->
                    </div>
                    <div class="monto_container">
                       
                        <p class="precio">$${carrito.carritoProducto.descuento>0 ? (carrito.carritoProducto.precio - carrito.carritoProducto.precio*carrito.carritoProducto.descuento/100) * carrito.cantidad : carrito.carritoProducto.precio * carrito.cantidad}</p>
                        
                    </div>
                </div>
                </article>`
                });

                result.data.forEach(carrito=>{
                    if(carrito.carritoProducto.descuento>0){ 
                    subtotal = subtotal + parseInt(carrito.carritoProducto.precio - carrito.carritoProducto.precio*carrito.carritoProducto.descuento/100) * carrito.cantidad
                    }else{ 
                    subtotal = subtotal + parseInt(carrito.carritoProducto.precio) * carrito.cantidad  
                    } 
                });

                console.log(subtotal);
                cartContainer.innerHTML += `<section class="monto_final">
                <div class="total_container">
                <div class="seguro">
                    <h5>Tus datos se mantendrán bajo estricta confidencialidad</h5>
                    <p>ForjaWeb usa un sistema de seguridad llamado SSL (Secure Socket Layer), te gustaría saber más sobre nuestras políticas de privacidad? Click abajo</p>
                    <a href="#">Leer más</a>
                </div>
                <div class="totales">
                    <h5>Subtotal</h5>
                    <h5>Envío</h5>
                    <h5>Total</h5>
                </div>
                    
               <div class="precio_total">
                    <h5>$${subtotal}</h5>
                    <h5>$300</h5>
                    <h5>$${subtotal + 300} </h5>
                </div>
                </div>
                <div class="mercado_pago">
                    <img src="/img/design/mercadopago.png" alt="">
                    <div class="boton_container">
                        <a href="#"><button class="pagar">Finalizar compra</button></a>
                    </div>
                </div>
                </section>`
                
                
                }
        })
        .catch(error=>console.log(error))
    }

    
    
    /* botonEliminar.addEventListener('click', (e) => {
        e.preventDefault()
        eliminarProducto()
    }) */

    listarProductos();

})