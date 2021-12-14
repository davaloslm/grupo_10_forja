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
            bttnLogin.disabled = false
            bttnLogin.style.backgroundColor = '#2AD2D2'
        } else {
            bttnLogin.disabled = true
            bttnLogin.style.backgroundColor = 'gray'
        }
    }


    // Expresiones regulares //
    let regExPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,}$/;
    let regExEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;


    // Inputs //
    const email = qs('#email')
    const contraseña = qs('#password')

    // Iconos //
    const checkEmail = qs('#checkEmail')
    const errorEmail = qs('#errorEmail')
    const checkContraseña = qs('#checkContraseña')
    const errorContraseña = qs('#errorContraseña')
    const verContraseña = qs('#verContraseña')
    const ocultarContraseña = qs('#ocultarContraseña')
    
    // Smalls //
    const smallEmail = qs('#smallLoginEmail')
    const smallContraseña = qs('#smallLoginContraseña')

    const bttnLogin = qs('#send')

    bttnLogin.disabled = true
    bttnLogin.style.backgroundColor = 'gray'


    email.focus()


    // EMAIL //
    email.addEventListener('blur', () => {

        switch (true) {
            case !email.value:
                email.style.border = '3px solid red'
                email.style.color = 'red'
                errorEmail.style.display = 'block'
                checkEmail.style.display = 'none'
                smallEmail.innerHTML = 'El campo email no puede estar vacío'
                validate.email = false
                break;
            case !regExEmail.test(email.value):
                email.style.border = '3px solid red'
                email.style.color = 'red'
                errorEmail.style.display = 'block'
                checkEmail.style.display = 'none'
                smallEmail.innerHTML = 'Debes ingresar un email válido'
                validate.email = false
                break;
            default:
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


    // CONTRASEÑA //
    contraseña.addEventListener('blur', () => {

        switch (true) {
            case !contraseña.value:
                contraseña.style.border = '3px solid red'
                contraseña.style.color = 'red'
                errorContraseña.style.display = 'block'
                checkContraseña.style.display = 'none'
                smallContraseña.innerHTML = 'El campo contraseña no puede estar vacío'
                validate.contraseña = false
                break;
            case contraseña.value.length < 8:
                contraseña.style.border = '3px solid red'
                contraseña.style.color = 'red'
                errorContraseña.style.display = 'block'
                checkContraseña.style.display = 'none'
                smallContraseña.innerHTML = 'La contraseña debe tener un mínimo de 8 caracteres'
                validate.contraseña = false
                break;
            case contraseña.value.length > 15:
                contraseña.style.border = '3px solid red'
                contraseña.style.color = 'red'
                errorContraseña.style.display = 'block'
                checkContraseña.style.display = 'none'
                smallContraseña.innerHTML = 'La contraseña no debe exceder los 15 caracteres'
                validate.contraseña = false
                break;
            case !regExPass.test(contraseña.value):
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


    // VER/OCULTAR CONTRASEÑA //
    ocultarContraseña.addEventListener('click', () => {
        
        ocultarContraseña.style.display = 'none'
        verContraseña.style.display = 'block'
        contraseña.type = "text"

    })

    verContraseña.addEventListener('click', () => {
        
        verContraseña.style.display = 'none'
        ocultarContraseña.style.display = 'block'
        contraseña.type = "password"

    
    })

    // VALIDACION //
    const validate = {
        email: true,
        contraseña: false,
    }


})