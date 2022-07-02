window.addEventListener('load', () => {

    const qs = (tag) => {
        return document.querySelector(tag);
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

});