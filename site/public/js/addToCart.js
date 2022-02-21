window.addEventListener('load', () => {
    // console.log('Exitosamente vinculado')

    const qs = (tag) => {
        return document.querySelector(tag)
    }

    // 
    const formulario = qs('.formAgregarProducto');
    const productoId = formulario.attributes.id.textContent;
    const inputCantidad = qs('.quantity');
    
    
    formulario.addEventListener('submit', (e) => {
        e.preventDefault()

        fetch(`http://localhost:3000/api/cart/add/${productoId}/${inputCantidad.value}`, {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data =>{
            console.log(data)
        })
        .catch(error=>console.log(error))

    })


})