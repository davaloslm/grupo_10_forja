window.addEventListener('load', () => {

    /* Función querySelector */
    const qs = (tag) => {
        return document.querySelector(tag)
    }

    var validateObj = {
        contraseña: false,
        nuevaContraseña: false
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

    const boton = qs(".form-button");

    //////////////////////RegEx//////////////////////


    const regExPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,}$/; 


    //////////////////////Inputs//////////////////////
    
    const password = qs("#password");
    const newPassword = qs("#newPassword");

    //////////////////////Iconos//////////////////////

    const checkPassword = qs('#checkPassword');
    const errorPassword = qs('#errorPassword');
    const checkNewPassword = qs('#checkNewPassword');
    const errorNewPassword = qs('#errorNewPassword');
    const verContraseña = qs('#verContraseña')
    const ocultarContraseña = qs('#ocultarContraseña')

    //////////////////////Smalls//////////////////////

    const smallPassword = qs('#smallPassword');
    const smallSmallNewPassword = qs('#smallApellido');

    //////////////////////Validación//////////////////////

    boton.disabled = true;
    boton.style.backgroundColor = "gray";

    /* Contraseña */

    password.addEventListener('blur', () => {

        switch (true) {
            case !password.value:
                password.style.border = '3px solid red'
                password.style.color = 'red'
                errorPassword.style.display = 'block'
                checkPassword.style.display = 'none'
                smallPassword.innerHTML = 'El campo contraseña no puede estar vacío'
                validate.password = false
                break;
            case password.value.length < 8:
                password.style.border = '3px solid red'
                password.style.color = 'red'
                errorPassword.style.display = 'block'
                checkPassword.style.display = 'none'
                smallPassword.innerHTML = 'La contraseña debe tener un mínimo de 8 caracteres'
                validate.password = false
                break;
            case password.value.length > 15:
                password.style.border = '3px solid red'
                password.style.color = 'red'
                errorPassword.style.display = 'block'
                checkPassword.style.display = 'none'
                smallPassword.innerHTML = 'La contraseña no debe exceder los 15 caracteres'
                validate.password = false
                break;
            case !regExPass.test(password.value):
                password.style.border = '3px solid red'
                password.style.color = 'red'
                errorPassword.style.display = 'block'
                checkPassword.style.display = 'none'
                smallPassword.innerHTML = 'La contraseña debe contener como mínimo: 1 mayúscula, 1 minúscula, 1 número y 1 caracter especial <br>'
                smallPassword.innerHTML += 'No se permiten espacios en blanco <br>'
                smallPassword.innerHTML += 'Los caracteres especiales pueden ser: @ $ ! % * ? &'
                validate.password = false
                break;
            default:
                password.style.border = '3px solid green'
                password.style.color = 'green'
                errorPassword.style.display = 'none'
                checkPassword.style.display = 'block'
                smallPassword.innerHTML = ''
                validate.password = true
                break;
        }

        validateFunction(validateObj)

    })

    /* Nueva contraseña */

    newPassword.addEventListener('blur', () => {

        switch (true) {
            case !newPassword.value:
                newPassword.style.border = '3px solid red'
                newPassword.style.color = 'red'
                errorNewPassword.style.display = 'block'
                checkNewPassword.style.display = 'none'
                smallNewPassword.innerHTML = 'El campo contraseña no puede estar vacío'
                validate.newPassword = false
                break;
            case newPassword.value.length < 8:
                newPassword.style.border = '3px solid red'
                newPassword.style.color = 'red'
                errorNewPassword.style.display = 'block'
                checkNewPassword.style.display = 'none'
                smallNewPassword.innerHTML = 'La contraseña debe tener un mínimo de 8 caracteres'
                validate.newPassword = false
                break;
            case newPassword.value.length > 15:
                newPassword.style.border = '3px solid red'
                newPassword.style.color = 'red'
                errorNewPassword.style.display = 'block'
                checkNewPassword.style.display = 'none'
                smallNewPassword.innerHTML = 'La contraseña no debe exceder los 15 caracteres'
                validate.newPassword = false
                break;
            case !regExPass.test(newPassword.value):
                newPassword.style.border = '3px solid red'
                newPassword.style.color = 'red'
                errorNewPassword.style.display = 'block'
                checkNewPassword.style.display = 'none'
                smallNewPassword.innerHTML = 'La contraseña debe contener como mínimo: 1 mayúscula, 1 minúscula, 1 número y 1 caracter especial <br>'
                smallNewPassword.innerHTML += 'No se permiten espacios en blanco <br>'
                smallNewPassword.innerHTML += 'Los caracteres especiales pueden ser: @ $ ! % * ? &'
                validate.newPassword = false
                break;
            default:
                newPassword.style.border = '3px solid green'
                newPassword.style.color = 'green'
                errorNewPassword.style.display = 'none'
                checkNewPassword.style.display = 'block'
                smallNewPassword.innerHTML = ''
                validate.newPassword = true
                break;
        }

        validateFunction(validateObj)

    })


    // Ver/Ocultar Contraseña //

    ocultarContraseña.addEventListener('click', () => {
        
        ocultarContraseña.style.display = 'none'
        verContraseña.style.display = 'block'
        password.type = "text"
        newPassword.type = "text"

    })

    verContraseña.addEventListener('click', () => {
        
        verContraseña.style.display = 'none'
        ocultarContraseña.style.display = 'block'
        password.type = "password"
        newPassword.type = "password"

    
    })

})