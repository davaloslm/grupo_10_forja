window.addEventListener('load', () => {

    /* Función querySelector */
    const qs = (tag) => {
        return document.querySelector(tag)
    }

    var validateObj;

    if(location.href.includes("edit")){
        console.log("edit");

        validateObj = {
            calle: true,
            numero: true,
            localidad: true,
            provincia: true,
            codigoPostal: true,
            departamento: true
        }

    }else{
        console.log("add");

        validateObj = {
            calle: false,
            numero: false,
            localidad: false,
            provincia: false,
            codigoPostal: false,
            departamento: false
        }

        
    }


    const validateFunction = (obj) => {
        let arr = Object.values(validateObj)
        
        if (!arr.includes(false)) {
            boton.disabled = false
            boton.style.backgroundColor = '#2AD2D2'
        } else {
            boton.disabled = true
            boton.style.backgroundColor = 'gray'
        }
    }

    const boton = qs(".form-button")
    
    //////////////////////RegEx//////////////////////

    const regExUsername = /^[a-zA-Z0-9\_\-]{4,16}$/; // Letras, numeros, guion y guion_bajo
    const regExLetras = /^[a-zA-ZÀ-ÿ\s]{2,}$/; // Letras y espacios, pueden llevar acentos.
    const regExPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,}$/; // 4 a 12 digitos.
    const regExEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const regExFecha = /^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})$/;
    const regExNum = /^\d{1,6}$/; 
    const regExImg = /(.jpg|.jpeg|.png|.gif|.webp)$/i;
    const fileSize = 2100000

    //////////////////////Inputs//////////////////////
    
    const calle = qs("#calle");
    const numero = qs("#numero");
    const localidad = qs("#localidad");
    const provincia = qs("#provincia");
    const codigoPostal = qs("#codigoPostal");
    const departamento = qs("#departamento");
    
    //////////////////////Iconos//////////////////////
    
    const checkCalle = qs('#checkCalle');
    const errorCalle = qs('#errorCalle');
    const checkNumero = qs('#checkNumero');
    const errorNumero = qs('#errorNumero');
    const checkLocalidad = qs('#checkLocalidad');
    const errorLocalidad = qs('#errorLocalidad');
    const checkProvincia = qs('#checkProvincia');
    const errorProvincia = qs('#errorProvincia');
    const checkCodigoPostal = qs('#checkCodigoPostal');
    const errorCodigoPostal = qs('#errorCodigoPostal');
    const checkDepartamento = qs('#checkDepartamento');
    const errorDepartamento = qs('#errorDepartamento');


    //////////////////////Validación//////////////////////

    boton.disabled = true;
    boton.style.backgroundColor = "gray";

    /* Calle */

    calle.addEventListener('input', () => {
        switch (true) {
            case !calle.value:
                calle.style.border = '3px solid red'
                calle.style.color = 'red'
                errorCalle.style.display = 'block'
                checkCalle.style.display = 'none'
                smallCalle.innerHTML = "El campo calle no puede estar vacío"
                validateObj.calle = false
                break;
            case calle.value.length < 2:
                calle.style.border = '3px solid red'
                calle.style.color = 'red'
                errorCalle.style.display = 'block'
                checkCalle.style.display = 'none'
                smallCalle.innerHTML = "El nombre de la calle debe tener como mínimo 2 letras"
                validateObj.calle = false
                break;
            case calle.value.length > 45:
                calle.style.border = '3px solid red'
                calle.style.color = 'red'
                errorCalle.style.display = 'block'
                checkCalle.style.display = 'none'
                smallCalle.innerHTML = "El nombre de la calle es demasiado largo"
                validateObj.calle = false
                break;
            case !regExLetras.test(calle.value):
                calle.style.border = '3px solid red'
                calle.style.color = 'red'
                errorCalle.style.display = 'block'
                checkCalle.style.display = 'none'
                smallCalle.innerHTML = "El nombre de la calle debe contener solo letras"
                validateObj.calle = false
                break;
            default:
                calle.classList.add('check')
                calle.style.border = '3px solid green'
                calle.style.color = 'green'
                errorCalle.style.display = 'none'
                checkCalle.style.display = 'block'
                smallCalle.innerHTML = ''
                validateObj.calle = true
                break;
        }

        validateFunction(validateObj)
    })

    /* Número */

    numero.addEventListener('input', () => {
        switch (true) {
            case !numero.value:
                numero.style.border = '3px solid red'
                numero.style.color = 'red'
                errorNumero.style.display = 'block'
                checkNumero.style.display = 'none'
                smallNumero.innerHTML = "El campo número no puede estar vacío"
                validateObj.numero = false
                break;
            case numero.value.length > 6:
                numero.style.border = '3px solid red'
                numero.style.color = 'red'
                errorNumero.style.display = 'block'
                checkNumero.style.display = 'none'
                smallNumero.innerHTML = "El número es demasiado largo"
                validateObj.numero = false
                break;
            case !regExNum.test(numero.value):
                numero.style.border = '3px solid red'
                numero.style.color = 'red'
                errorNumero.style.display = 'block'
                checkNumero.style.display = 'none'
                smallNumero.innerHTML = "El campo número solo puede contener números"
                validateObj.numero = false
                break;
            default:
                numero.style.border = '3px solid green'
                numero.style.color = 'green'
                errorNumero.style.display = 'none'
                checkNumero.style.display = 'block'
                smallNumero.innerHTML = ""
                validateObj.numero = true
                break;
        }

        validateFunction(validateObj)
    })

    /* Localidad */

    localidad.addEventListener('input', () => {
        switch (true) {
            case !localidad.value:
                localidad.style.border = '3px solid red'
                localidad.style.color = 'red'
                errorLocalidad.style.display = 'block'
                checkLocalidad.style.display = 'none'
                smallLocalidad.innerHTML = "El campo localidad no puede estar vacío"
                validateObj.localidad = false
                break;
            case localidad.value.length < 2:
                localidad.style.border = '3px solid red'
                localidad.style.color = 'red'
                errorLocalidad.style.display = 'block'
                checkLocalidad.style.display = 'none'
                smallLocalidad.innerHTML = "El nombre de la localidad debe tener como mínimo 2 letras"
                validateObj.localidad = false
                break;
            case localidad.value.length > 50:
                localidad.style.border = '3px solid red'
                localidad.style.color = 'red'
                errorLocalidad.style.display = 'block'
                checkLocalidad.style.display = 'none'
                smallLocalidad.innerHTML = "El nombre de la localidad es demasiado largo"
                validateObj.localidad = false
                break;
            case !regExLetras.test(localidad.value):
                localidad.style.border = '3px solid red'
                localidad.style.color = 'red'
                errorLocalidad.style.display = 'block'
                checkLocalidad.style.display = 'none'
                smallLocalidad.innerHTML = "El nombre de la localidad debe contener solo letras"
                validateObj.localidad = false
                break;
            default:
                localidad.classList.add('check')
                localidad.style.border = '3px solid green'
                localidad.style.color = 'green'
                errorLocalidad.style.display = 'none'
                checkLocalidad.style.display = 'block'
                smallLocalidad.innerHTML = ''
                validateObj.localidad = true
                break;
        }

        validateFunction(validateObj)
    })

    /* Provincia */

    provincia.addEventListener('input', () => {
        switch (true) {
            case !provincia.value:
                provincia.style.border = '3px solid red'
                provincia.style.color = 'red'
                errorProvincia.style.display = 'block'
                checkProvincia.style.display = 'none'
                smallProvincia.innerHTML = "El campo provincia no puede estar vacío"
                validateObj.provincia = false
                break;
            case provincia.value.length < 2:
                provincia.style.border = '3px solid red'
                provincia.style.color = 'red'
                errorProvincia.style.display = 'block'
                checkProvincia.style.display = 'none'
                smallProvincia.innerHTML = "El nombre de la provincia debe tener como mínimo 2 letras"
                validateObj.provincia = false
                break;
            case provincia.value.length > 50:
                provincia.style.border = '3px solid red'
                provincia.style.color = 'red'
                errorProvincia.style.display = 'block'
                checkProvincia.style.display = 'none'
                smallProvincia.innerHTML = "El nombre de la provincia es demasiado largo"
                validateObj.provincia = false
                break;
            case !regExLetras.test(provincia.value):
                provincia.style.border = '3px solid red'
                provincia.style.color = 'red'
                errorProvincia.style.display = 'block'
                checkProvincia.style.display = 'none'
                smallProvincia.innerHTML = "El nombre de la provincia debe contener solo letras"
                validateObj.provincia = false
                break;
            default:
                provincia.classList.add('check')
                provincia.style.border = '3px solid green'
                provincia.style.color = 'green'
                errorProvincia.style.display = 'none'
                checkProvincia.style.display = 'block'
                smallProvincia.innerHTML = ''
                validateObj.provincia = true
                break;
        }

        validateFunction(validateObj)
    })

    /* Codigo Postal */

    codigoPostal.addEventListener('input', () => {
        switch (true) {
            case !codigoPostal.value:
                codigoPostal.style.border = '3px solid red'
                codigoPostal.style.color = 'red'
                errorCodigoPostal.style.display = 'block'
                checkCodigoPostal.style.display = 'none'
                smallCodigoPostal.innerHTML = "El campo número no puede estar vacío"
                validateObj.codigoPostal = false
                break;
            case codigoPostal.value.length > 6:
                codigoPostal.style.border = '3px solid red'
                codigoPostal.style.color = 'red'
                errorCodigoPostal.style.display = 'block'
                checkCodigoPostal.style.display = 'none'
                smallCodigoPostal.innerHTML = "El número es demasiado largo"
                validateObj.codigoPostal = false
                break;
            case !regExNum.test(codigoPostal.value):
                codigoPostal.style.border = '3px solid red'
                codigoPostal.style.color = 'red'
                errorCodigoPostal.style.display = 'block'
                checkCodigoPostal.style.display = 'none'
                smallCodigoPostal.innerHTML = "El campo número solo puede contener números"
                validateObj.codigoPostal = false
                break;
            default:
                codigoPostal.style.border = '3px solid green'
                codigoPostal.style.color = 'green'
                errorCodigoPostal.style.display = 'none'
                checkCodigoPostal.style.display = 'block'
                smallCodigoPostal.innerHTML = ""
                validateObj.codigoPostal = true
                break;
        }

        validateFunction(validateObj)
    })


    /* Departamento */

    departamento.addEventListener('input', () => {
        switch (true) {
            case !departamento.value:
                departamento.style.border = '3px solid red'
                departamento.style.color = 'red'
                errorDepartamento.style.display = 'block'
                checkDepartamento.style.display = 'none'
                smallDepartamento.innerHTML = "El campo número no puede estar vacío"
                validateObj.departamento = false
                break;
            case departamento.value.length > 6:
                departamento.style.border = '3px solid red'
                departamento.style.color = 'red'
                errorDepartamento.style.display = 'block'
                checkDepartamento.style.display = 'none'
                smallDepartamento.innerHTML = "El número es demasiado largo"
                validateObj.departamento = false
                break;
            case !regExNum.test(departamento.value):
                departamento.style.border = '3px solid red'
                departamento.style.color = 'red'
                errorDepartamento.style.display = 'block'
                checkDepartamento.style.display = 'none'
                smallDepartamento.innerHTML = "El campo número solo puede contener números"
                validateObj.departamento = false
                break;
            default:
                departamento.style.border = '3px solid green'
                departamento.style.color = 'green'
                errorDepartamento.style.display = 'none'
                checkDepartamento.style.display = 'block'
                smallDepartamento.innerHTML = ""
                validateObj.departamento = true
                break;
        }

        validateFunction(validateObj)
    })

    
})