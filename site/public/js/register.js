window.addEventListener('load', () => {
    // console.log('Se vinculó correctamente');

    // Query selector //
    const qs = (tag) => {
        return document.querySelector(tag)
    }

    // Función para validar en línea //
    const funcValidate = (obj) => {
        let arr = Object.values(validate)
        
        if (!arr.includes(false)) {
            bttnEnviar.disabled = false
            bttnEnviar.style.backgroundColor = '#2AD2D2'
        } else {
            bttnEnviar.disabled = true
            bttnEnviar.style.backgroundColor = 'gray'
        }
    }

    // let regExUsername = /^[a-zA-Z0-9\_\-]{4,16}$/; // Letras, numeros, guion y guion_bajo
    // let regExTel = /^\d{7,14}$/; // 7 a 14 numeros.
    
    // Expresiones regulares //
    let regExLetras = /^[a-zA-ZÀ-ÿ\s]{2,}$/; // Letras y espacios, pueden llevar acentos.
    let regExPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,}$/;
    let regExEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    let regExImg = /(.jpg|.jpeg|.png|.gif|.webp)$/i;
    let fileSize = 2100000


    // Inputs //
    const form = qs('form')
    const nombre = qs('#nombre')
    const apellido = qs('#apellido')
    const email = qs('#email')
    const fechaDeNac = qs('#fechaDeNac')
    const contraseña = qs('#contraseña')
    const contraseña2 = qs('#contraseña2')
    const imagen = qs('#imagen')
    const labelImagen = qs('#labelImagen')
    const terminos = qs('#terminos')

    // Iconos //
    const checkNombre = qs('#checkNombre')
    const errorNombre = qs('#errorNombre')
    const checkApellido = qs('#checkApellido')
    const errorApellido = qs('#errorApellido')
    const checkEmail = qs('#checkEmail')
    const errorEmail = qs('#errorEmail')
    const checkFechaDeNac = qs('#checkFechaDeNac')
    const errorFechaDeNac = qs('#errorFechaDeNac')
    const checkContraseña = qs('#checkContraseña')
    const errorContraseña = qs('#errorContraseña')
    const checkContraseña2 = qs('#checkContraseña2')
    const errorContraseña2 = qs('#errorContraseña2')
    const verContraseña = qs('#verContraseña')
    const ocultarContraseña = qs('#ocultarContraseña')
    
    // Smalls //
    const smallNombre = qs('small.frontNombre')
    const smallApellido = qs('small.frontApellido')
    const smallEmail = qs('small.frontEmail')
    const smallFechaDeNac = qs('small.frontFecha')
    const smallContraseña = qs('small.frontContraseña')
    const smallContraseña2 = qs('small.frontContraseña2')
    const smallImagen = qs('small.frontImagen')
    const smallTerminos = qs('small.frontTerminos')

    const inputs = document.querySelectorAll('.inputs')
    const small = document.querySelectorAll('#smallsFront')

    const bttnEnviar = qs('#send')

    bttnEnviar.disabled = true
    bttnEnviar.style.backgroundColor = 'gray'


    nombre.focus()
    
    // Validaciones //
    // NOMBRE //
    nombre.addEventListener('input', () => {
        switch (true) {
            case !nombre.value:
                nombre.classList.add('nocheck')
                nombre.style.border = '3px solid red'
                nombre.style.color = 'red'
                errorNombre.style.display = 'block'
                checkNombre.style.display = 'none'
                smallNombre.innerHTML = "El campo nombre no puede estar vacío"
                validate.nombre = false
                break;
            case nombre.value.length < 2:
                nombre.classList.add('nocheck')
                nombre.style.border = '3px solid red'
                nombre.style.color = 'red'
                errorNombre.style.display = 'block'
                checkNombre.style.display = 'none'
                smallNombre.innerHTML = "El nombre debe tener como mínimo 2 letras"
                validate.nombre = false
                break;
            case nombre.value.length > 50:
                nombre.classList.add('nocheck')
                nombre.style.border = '3px solid red'
                nombre.style.color = 'red'
                errorNombre.style.display = 'block'
                checkNombre.style.display = 'none'
                smallNombre.innerHTML = "El nombre es demasiado largo"
                validate.nombre = false
                break;
            case !regExLetras.test(nombre.value):
                nombre.classList.add('nocheck')
                nombre.style.border = '3px solid red'
                nombre.style.color = 'red'
                errorNombre.style.display = 'block'
                checkNombre.style.display = 'none'
                smallNombre.innerHTML = "El nombre debe contener solo letras"
                validate.nombre = false
                break;
            default:
                nombre.classList.remove('nocheck')
                nombre.classList.add('check')
                nombre.style.border = '3px solid green'
                nombre.style.color = 'green'
                errorNombre.style.display = 'none'
                checkNombre.style.display = 'block'
                smallNombre.innerHTML = ''
                validate.nombre = true
                break;
        }

        funcValidate(validate)
    })


    // APELLIDO //
    apellido.addEventListener('input', () => {
        switch (true) {
            case !apellido.value:
                apellido.classList.add('nocheck')
                apellido.style.border = '3px solid red'
                apellido.style.color = 'red'
                errorApellido.style.display = 'block'
                checkApellido.style.display = 'none'
                smallApellido.innerHTML = "El campo apellido no puede estar vacío"
                validate.apellido = false
                break;
            case apellido.value.length < 2:
                apellido.classList.add('nocheck')
                apellido.style.border = '3px solid red'
                apellido.style.color = 'red'
                errorApellido.style.display = 'block'
                checkApellido.style.display = 'none'
                smallApellido.innerHTML = "El apellido debe tener como mínimo 2 letras"
                validate.apellido = false
                break;
            case apellido.value.length > 50:
                apellido.classList.add('nocheck')
                apellido.style.border = '3px solid red'
                apellido.style.color = 'red'
                errorApellido.style.display = 'block'
                checkApellido.style.display = 'none'
                smallApellido.innerHTML = "El apellido es demasiado largo"
                validate.apellido = false
                break;
            case !regExLetras.test(apellido.value):
                apellido.classList.add('nocheck')
                apellido.style.border = '3px solid red'
                apellido.style.color = 'red'
                errorApellido.style.display = 'block'
                checkApellido.style.display = 'none'
                smallApellido.innerHTML = "El apellido debe contener solo letras"
                validate.apellido = false
                break;
            default:
                apellido.classList.remove('nocheck')
                apellido.classList.add('check')
                apellido.style.border = '3px solid green'
                apellido.style.color = 'green'
                errorApellido.style.display = 'none'
                checkApellido.style.display = 'block'
                smallApellido.innerHTML = ""
                validate.apellido = true
                break;
        }

        funcValidate(validate)
    })


    // EMAIL //
    email.addEventListener('input', () => {

        switch (true) {
            case !email.value:
                email.classList.add('nocheck')
                email.style.border = '3px solid red'
                email.style.color = 'red'
                errorEmail.style.display = 'block'
                checkEmail.style.display = 'none'
                smallEmail.innerHTML = 'El campo email no puede estar vacío'
                validate.email = false
                break;
            case !regExEmail.test(email.value):
                email.classList.add('nocheck')
                email.style.border = '3px solid red'
                email.style.color = 'red'
                errorEmail.style.display = 'block'
                checkEmail.style.display = 'none'
                smallEmail.innerHTML = 'Debes ingresar un email válido'
                validate.email = false
                break;
            default:
                email.classList.remove('nocheck')
                email.classList.add('check')
                email.style.border = '3px solid green'
                email.style.color = 'green'
                errorEmail.style.display = 'none'
                checkEmail.style.display = 'block'
                smallEmail.innerHTML = ''
                validate.email = true
                break;
        }

        funcValidate(validate)
    })


    // FECHA DE NACIMIENTO //
    fechaDeNac.addEventListener('input', () => {

        switch (true) {
            case !fechaDeNac.value:
                fechaDeNac.classList.add('nocheck')
                fechaDeNac.style.border = '3px solid red'
                fechaDeNac.style.color = 'red'
                errorFechaDeNac.style.display = 'block'
                checkFechaDeNac.style.display = 'none'
                smallFechaDeNac.innerHTML = 'El campo fecha no puede estar vacío'
                validate.fechaDeNac = false
                break;
            case moment(fechaDeNac.value) > moment():
                fechaDeNac.classList.add('nocheck')
                fechaDeNac.style.border = '3px solid red'
                fechaDeNac.style.color = 'red'
                errorFechaDeNac.style.display = 'block'
                checkFechaDeNac.style.display = 'none'
                smallFechaDeNac.innerHTML = 'Debes ingresar una fecha válida'
                validate.fechaDeNac = false
                break;
            case moment().diff(moment(fechaDeNac.value), 'years') < 18:
                fechaDeNac.classList.add('nocheck')
                fechaDeNac.style.border = '3px solid red'
                fechaDeNac.style.color = 'red'
                errorFechaDeNac.style.display = 'block'
                checkFechaDeNac.style.display = 'none'
                smallFechaDeNac.innerHTML = 'Debes ser mayor de edad para registrarte'
                validate.fechaDeNac = false
                break;
            case moment().diff(moment(fechaDeNac.value), 'years') > 120:
                fechaDeNac.classList.add('nocheck')
                fechaDeNac.style.border = '3px solid red'
                fechaDeNac.style.color = 'red'
                errorFechaDeNac.style.display = 'block'
                checkFechaDeNac.style.display = 'none'
                smallFechaDeNac.innerHTML = '¿Acaso tienes mas años que Chiyo Miyako?'
                validate.fechaDeNac = false
                break;
            /* case !regExFecha.test(fechaDeNac.value):
                fechaDeNac.classList.add('nocheck')
                fechaDeNac.style.border = '3px solid red'
                fechaDeNac.style.color = 'red'
                errorFechaDeNac.style.display = 'block'
                checkFechaDeNac.style.display = 'none'
                smallFechaDeNac.innerHTML = 'Debes ingresar un formato de fecha válido, ejemplo: 13/02/1996'
                validate.fechaDeNac = false
                break; */
            default:
                fechaDeNac.classList.remove('nocheck')
                fechaDeNac.classList.add('check')
                fechaDeNac.style.border = '3px solid green'
                fechaDeNac.style.color = 'green'
                errorFechaDeNac.style.display = 'none'
                checkFechaDeNac.style.display = 'block'
                smallFechaDeNac.innerHTML = ''
                validate.fechaDeNac = true
                break;
        }

        funcValidate(validate)
    })


    // CONTRASEÑA //
    contraseña.addEventListener('input', () => {

        switch (true) {
            case !contraseña.value:
                contraseña.classList.add('nocheck')
                contraseña.style.border = '3px solid red'
                contraseña.style.color = 'red'
                errorContraseña.style.display = 'block'
                checkContraseña.style.display = 'none'
                smallContraseña.innerHTML = 'El campo contraseña no puede estar vacío'
                validate.contraseña = false
                break;
            case contraseña.value.length < 8:
                contraseña.classList.add('nocheck')
                contraseña.style.border = '3px solid red'
                contraseña.style.color = 'red'
                errorContraseña.style.display = 'block'
                checkContraseña.style.display = 'none'
                smallContraseña.innerHTML = 'La contraseña debe tener un mínimo de 8 caracteres'
                validate.contraseña = false
                break;
            case contraseña.value.length > 15:
                contraseña.classList.add('nocheck')
                contraseña.style.border = '3px solid red'
                contraseña.style.color = 'red'
                errorContraseña.style.display = 'block'
                checkContraseña.style.display = 'none'
                smallContraseña.innerHTML = 'La contraseña no debe exceder los 15 caracteres'
                validate.contraseña = false
                break;
            case !regExPass.test(contraseña.value):
                contraseña.classList.add('nocheck')
                contraseña.style.border = '3px solid red'
                contraseña.style.color = 'red'
                errorContraseña.style.display = 'block'
                checkContraseña.style.display = 'none'
                smallContraseña.innerHTML = 'La contraseña debe contener como mínimo: 1 mayúscula, 1 minúscula, 1 número y 1 caracter especial <br>'
                smallContraseña.innerHTML += 'No se permiten espacios en blanco <br>'
                smallContraseña.innerHTML += 'Los caracteres especiales pueden ser: @ $ ! % * ? &'
                validate.contraseña = false
                break;
            default:
                contraseña.classList.remove('nocheck')
                contraseña.classList.add('check')
                contraseña.style.border = '3px solid green'
                contraseña.style.color = 'green'
                errorContraseña.style.display = 'none'
                checkContraseña.style.display = 'block'
                smallContraseña.innerHTML = ''
                validate.contraseña = true
                break;
        }

        funcValidate(validate)
    })


    // CONTRASEÑA 2 //
    contraseña2.addEventListener('input', () => {

        switch (true) {
            case !contraseña2.value:
                contraseña2.classList.add('nocheck')
                contraseña2.style.border = '3px solid red'
                contraseña2.style.color = 'red'
                errorContraseña2.style.display = 'block'
                checkContraseña2.style.display = 'none'
                smallContraseña2.innerHTML = 'Es necesario que escribas nuevamente tu contraseña'
                validate.contraseña2 = false
                break;
            case contraseña2.value !== contraseña.value:
                contraseña2.classList.add('nocheck')
                contraseña2.style.border = '3px solid red'
                contraseña2.style.color = 'red'
                errorContraseña2.style.display = 'block'
                checkContraseña2.style.display = 'none'
                smallContraseña2.innerHTML = 'Las contraseñas no coinciden'
                validate.contraseña2 = false
                break;
            default:
                contraseña2.classList.remove('nocheck')
                contraseña2.classList.add('check')
                contraseña2.style.border = '3px solid green'
                contraseña2.style.color = 'green'
                errorContraseña2.style.display = 'none'
                checkContraseña2.style.display = 'block'
                smallContraseña2.innerHTML = ''
                validate.contraseña2 = true
                break;
        }

        funcValidate(validate)
    })


    // IMAGEN //
    imagen.addEventListener('change', () => {

        let previewsDiv = qs("#previews");

        switch (true) {
            case !regExImg.exec(imagen.value):
                /* Borrado de imágenes anteriores */
                while (previewsDiv.firstChild) {
                    previewsDiv.removeChild(previewsDiv.firstChild);
                }
                imagen.classList.add('nocheck')
                labelImagen.style.backgroundColor = 'red'
                labelImagen.style.color = 'white'
                smallImagen.innerHTML = 'Solo se permiten imágenes con extensión jpg, jpeg, png, gif y webp'
                smallImagen.style.color = 'red'
                validate.imagen = false
                break;
            case imagen.files[0].size > fileSize:
                /* Borrado de imágenes anteriores */
                while (previewsDiv.firstChild) {
                    previewsDiv.removeChild(previewsDiv.firstChild);
                }
                imagen.classList.add('nocheck')
                labelImagen.style.backgroundColor = 'red'
                labelImagen.style.color = 'white'
                smallImagen.innerHTML = 'La imagen debe pesar menos de 2MB'
                smallImagen.style.color = 'red'
                validate.imagen = false
                break;
            default:
                /* Borrado de imágenes anteriores */
                while (previewsDiv.firstChild) {
                    previewsDiv.removeChild(previewsDiv.firstChild);
                }
                /* Previsualización de imagen */
                previewsDiv.appendChild(document.createElement("img")).src = URL.createObjectURL(imagen.files[0])
            
                imagen.classList.remove('nocheck')
                imagen.classList.add('check')
                labelImagen.style.backgroundColor = 'green'
                labelImagen.style.color = 'black'
                smallImagen.innerHTML = `Tu imagen de perfil: ${imagen.value}`
                smallImagen.style.color = 'green'
                validate.imagen = true
                break;
        }

        funcValidate(validate)
    })


    // TERMINOS //
    terminos.addEventListener('change', () => {

        if (terminos.checked !== true) {
            terminos.classList.add('nocheck')
            terminos.style.boxShadow = '0px 1px 10px rgb(158 5 5)'
            smallTerminos.innerHTML = 'Debes aceptar nuestros términos y condiciones'
            validate.terminos = false
        } else {
            terminos.classList.remove('nocheck')
            terminos.classList.add('check')
            terminos.style.boxShadow = '0px 1px 10px rgb(23 158 5)'
            smallTerminos.innerHTML = ''
            validate.terminos = true
        }

        funcValidate(validate)
    })


    // VER/OCULTAR CONTRASEÑA //
    ocultarContraseña.addEventListener('click', () => {
        
        ocultarContraseña.style.display = 'none'
        verContraseña.style.display = 'block'
        contraseña.type = "text"
        contraseña2.type = "text"
    })

    verContraseña.addEventListener('click', () => {
        
        verContraseña.style.display = 'none'
        ocultarContraseña.style.display = 'block'
        contraseña.type = "password"
        contraseña2.type = "password"
    
    })

    // VALIDACION //
    const validate = {
        nombre: false,
        apellido: false,
        email: false,
        fechaDeNac: false,
        contraseña: false,
        contraseña2: false,
        imagen: true,
        terminos: false
    }


    form.addEventListener('submit', (e) => {

        for ( let i = 0; i < inputs.length; i++) {

            if (inputs[i].value === '') {
                e.preventDefault()
                inputs[i].classList.add('nocheck')
                small[i].innerHTML = 'Este campo no debe estar vacío'
                bttnEnviar.style.backgroundColor = 'gray'
                bttnEnviar.disabled = true

            } else if (inputs[i].classList.contains('check')) {
                bttnEnviar.disabled = false
                bttnEnviar.style.backgroundColor = '#2AD2D2'
            }
        }


    })
    


})