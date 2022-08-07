window.addEventListener('load', () => {
    // console.log('Exitosamente vinculado')

    const qs = (tag) => {
        return document.querySelector(tag)
    }

    // 
    const formulario = qs('.formAgregarProducto');
    const productoId = formulario.attributes.id.textContent;
    const inputCantidad = qs('.quantity');
    const addBtn = qs("#añadir")
    
    
    formulario.addEventListener('submit', (e) => {
        e.preventDefault()

        fetch(`http://localhost:3000/api/cart/add/${productoId}/${inputCantidad.value}`, {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data =>{
        
                Swal.fire({
                    icon: 'success',
                    title: 'Se agregó el producto al carrito',
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                  })
            
        })
        .catch(error=>console.log(error))

    })


})