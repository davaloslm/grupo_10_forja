window.addEventListener('load', () => {

    const qs = (tag) => {
        return document.querySelector(tag);
    }

    // Query selector All //
    const qsAll = (tag) => {
        return document.querySelectorAll(tag)
    }

    const regExNumeros = /^\d{1,3}$/;

    const inputCantidad = qs('#cantidad');
    const bttnSuma = qs('#sumar_cantidad');
    const bttnResta = qs('#restar_cantidad');
    const smallInputCantidad = qs('#errorCantidad');
    const bttnAgregarCarrito = qs('#agregarAlCarrito');

    
    
    const funcValidate = (obj) => {
        let arr = Object.values(validate);
        
        if (!arr.includes(false)) {
            bttnAgregarCarrito.disabled = false;
            bttnAgregarCarrito.style.backgroundColor = '#2AD2D2';
        } else {
            bttnAgregarCarrito.disabled = true;
            bttnAgregarCarrito.style.backgroundColor = 'gray';
        }
    };

    const validate = {
        cantidad: true
    }
    

    bttnSuma.addEventListener('click', (e) => {
        e.preventDefault();
        inputCantidad.value ++;
        validacionInputCantidad();
    });

    bttnResta.addEventListener('click', (e) => {
        e.preventDefault();
        inputCantidad.value --;
        validacionInputCantidad();
    });

    let validacionInputCantidad = () => {
        switch (true) {
            case !inputCantidad.value:
                smallInputCantidad.innerHTML = "La cantidad no puede estar vacía.";
                smallInputCantidad.style.color = 'red';
                validate.cantidad = false;
                break;
            case inputCantidad.value < 1:
                smallInputCantidad.innerHTML = "La cantidad mínima es de 1 unidad.";
                smallInputCantidad.style.color = 'red';
                validate.cantidad = false;
                break;
            case inputCantidad.value > 100:
                smallInputCantidad.innerHTML = "La cantidad máxima es de 100 unidades.";
                smallInputCantidad.style.color = 'red';
                validate.cantidad = false;
                break;
            case !regExNumeros.test(inputCantidad.value):
                smallInputCantidad.innerHTML = "Número inválido.";
                smallInputCantidad.style.color = 'red';
                validate.cantidad = false;
                break;
            default:
                smallInputCantidad.innerHTML = "";
                validate.cantidad = true;
                break;
        }

        funcValidate(validate);
    }

    inputCantidad.addEventListener('input', () => {
        validacionInputCantidad();
    })


    /* Slider para vista mobile en detalle de producto */

    const slider = qs('#slider');
    let fotos = qsAll('#articles')
    let ultFoto = fotos[fotos.length -1];

    const bttnLeft = qs('#bttnLeft');
    const bttnRight = qs('#bttnRight');


    slider.insertAdjacentElement('afterbegin', ultFoto)

    // Función siguiente imagen //
    function Next() {
        let priFoto = qsAll('#articles')[0];
        slider.style.marginLeft = '-200%'
        slider.style.transition = 'all 0.5s'
        setTimeout(function() {
            slider.style.transition = 'none'
            slider.insertAdjacentElement('beforeend', priFoto)
            slider.style.marginLeft = "-100%"
        }, 500);
    }

    // Función anterior imagen //
    function Prev() {
        let fotos = qsAll('#articles');
        let ultFoto = fotos[fotos.length -1];
        slider.style.marginLeft = '0'
        slider.style.transition = 'all 0.5s'
        setTimeout(function() {
            slider.style.transition = 'none'
            slider.insertAdjacentElement('afterbegin', ultFoto)
            slider.style.marginLeft = "-100%"
        }, 500);
    }

    bttnRight.addEventListener('click', () => {
        Next()
    })

    bttnLeft.addEventListener('click', () => {
        Prev()
    })

    /* Función cambio entre fotos para tablet y desktop (proximamente) */

    /* Función alerta "Agregado al carrito!" */

    const formulario = qs('.formAgregarProducto');
    const productoId = formulario.attributes.id.textContent;

    formulario.addEventListener('submit', (e) => {
        e.preventDefault()

        fetch(`http://localhost:3000/api/cart/add/${productoId}/${inputCantidad.value}`, {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
        
            Swal.fire({
                toast: true,
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


});