window.addEventListener('load', () => {

    /* Función querySelector */
    const qs = (tag) => {
        return document.querySelector(tag)
    }

    var validateObj = {
        nombre: true,
        apellido: true,
        userName: true,
        email: true,
        telefono: true,
        imagen: true
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

    const formulario = qs(".profile")
    const boton = qs(".edit-button")

    //////////////////////RegEx//////////////////////

    const regExUsername = /^[a-zA-Z0-9\_\-]{4,16}$/; // Letras, numeros, guion y guion_bajo
    const regExLetras = /^[a-zA-ZÀ-ÿ\s]{2,}$/; // Letras y espacios, pueden llevar acentos.
    const regExPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,}$/; // 4 a 12 digitos.
    const regExEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const regExFecha = /^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})$/;
    const regExTel = /^\d{7,14}$/; // 7 a 14 numeros.
    const regExImg = /(.jpg|.jpeg|.png|.gif|.webp)$/i;
    const fileSize = 2100000

    //////////////////////Inputs//////////////////////
    
    const nombre = qs("#nombre");
    const apellido = qs("#apellido");
    const userName = qs("#userName");
    const email = qs("#email");
    const telefono = qs("#telefono");
    const imagen = qs("#imagen");
    
    //////////////////////Iconos//////////////////////
    
    const checkNombre = qs('#checkNombre');
    const errorNombre = qs('#errorNombre');
    const checkApellido = qs('#checkApellido');
    const errorApellido = qs('#errorApellido');
    const checkUserName = qs('#checkUserName');
    const errorUserName = qs('#errorUserName');
    const checkEmail = qs('#checkEmail');
    const errorEmail = qs('#errorEmail');
    const checkTelefono = qs('#checkTelefono');
    const errorTelefono = qs('#errorTelefono');
    
    //////////////////////Smalls//////////////////////

    const smallNombre = qs('#smallNombre');
    const smallApellido = qs('#smallApellido');
    const smallUserName = qs('#smallUserName');
    const smallEmail = qs('#smallEmail');
    const smallTelefono = qs('#smallTelefono');
    const smallImagen = qs('#smallImagen');

    //////////////////////Validación//////////////////////

    boton.disabled = true;
    boton.style.backgroundColor = "gray";

    /* Nombre */
    nombre.addEventListener('input', () => {
        switch (true) {
            case !nombre.value:
                /* nombre.classList.add('nocheck') */
                nombre.style.border = '3px solid red'
                nombre.style.color = 'red'
                errorNombre.style.display = 'block'
                checkNombre.style.display = 'none'
                smallNombre.innerHTML = "El campo nombre no puede estar vacío"
                validateObj.nombre = false
                break;
            case nombre.value.length < 2:
                /* nombre.classList.add('nocheck') */
                nombre.style.border = '3px solid red'
                nombre.style.color = 'red'
                errorNombre.style.display = 'block'
                checkNombre.style.display = 'none'
                smallNombre.innerHTML = "El nombre debe tener como mínimo 2 letras"
                validateObj.nombre = false
                break;
            case nombre.value.length > 50:
                /* nombre.classList.add('nocheck') */
                nombre.style.border = '3px solid red'
                nombre.style.color = 'red'
                errorNombre.style.display = 'block'
                checkNombre.style.display = 'none'
                smallNombre.innerHTML = "El nombre es demasiado largo"
                validateObj.nombre = false
                break;
            case !regExLetras.test(nombre.value):
                /* nombre.classList.add('nocheck') */
                nombre.style.border = '3px solid red'
                nombre.style.color = 'red'
                errorNombre.style.display = 'block'
                checkNombre.style.display = 'none'
                smallNombre.innerHTML = "El nombre debe contener solo letras"
                validateObj.nombre = false
                break;
            default:
                /* nombre.classList.remove('nocheck') */
                nombre.classList.add('check')
                nombre.style.border = '3px solid green'
                nombre.style.color = 'green'
                errorNombre.style.display = 'none'
                checkNombre.style.display = 'block'
                smallNombre.innerHTML = ''
                validateObj.nombre = true
                break;
        }

        validateFunction(validateObj)
    })

    console.log(smallNombre);

    /* Apellido */

    apellido.addEventListener('input', () => {
        switch (true) {
            case !apellido.value:
                /* apellido.classList.add('nocheck') */
                apellido.style.border = '3px solid red'
                apellido.style.color = 'red'
                errorApellido.style.display = 'block'
                checkApellido.style.display = 'none'
                smallApellido.innerHTML = "El campo apellido no puede estar vacío"
                validateObj.apellido = false
                break;
            case apellido.value.length < 2:
                /* apellido.classList.add('nocheck') */
                apellido.style.border = '3px solid red'
                apellido.style.color = 'red'
                errorApellido.style.display = 'block'
                checkApellido.style.display = 'none'
                smallApellido.innerHTML = "El apellido debe tener como mínimo 2 letras"
                validateObj.apellido = false
                break;
            case apellido.value.length > 50:
                /* apellido.classList.add('nocheck') */
                apellido.style.border = '3px solid red'
                apellido.style.color = 'red'
                errorApellido.style.display = 'block'
                checkApellido.style.display = 'none'
                smallApellido.innerHTML = "El apellido es demasiado largo"
                validateObj.apellido = false
                break;
            case !regExLetras.test(apellido.value):
                /* apellido.classList.add('nocheck') */
                apellido.style.border = '3px solid red'
                apellido.style.color = 'red'
                errorApellido.style.display = 'block'
                checkApellido.style.display = 'none'
                smallApellido.innerHTML = "El apellido debe contener solo letras"
                validateObj.apellido = false
                break;
            default:
                /* apellido.classList.remove('nocheck') */
                apellido.classList.add('check')
                apellido.style.border = '3px solid green'
                apellido.style.color = 'green'
                errorApellido.style.display = 'none'
                checkApellido.style.display = 'block'
                smallApellido.innerHTML = ""
                validateObj.apellido = true
                break;
        }

        validateFunction(validateObj)
    })
    /* Username */
    userName.addEventListener('input', () => {
        switch (true) {
            case !userName.value:
                /* userName.classList.add('nocheck') */
                userName.style.border = '3px solid red'
                userName.style.color = 'red'
                errorUserName.style.display = 'block'
                checkUserName.style.display = 'none'
                smallUserName.innerHTML = "El campo nombre de usuario no puede estar vacío"
                validateObj.userName = false
                break;
            case userName.value.length < 4:
                /* userName.classList.add('nocheck') */
                userName.style.border = '3px solid red'
                userName.style.color = 'red'
                errorUserName.style.display = 'block'
                checkUserName.style.display = 'none'
                smallUserName.innerHTML = "El nombre de usuario debe tener como mínimo 4 caracteres"
                validateObj.userName = false
                break;
            case userName.value.length > 50:
                /* userName.classList.add('nocheck') */
                userName.style.border = '3px solid red'
                userName.style.color = 'red'
                errorUserName.style.display = 'block'
                checkUserName.style.display = 'none'
                smallUserName.innerHTML = "El nombre de usuario es demasiado largo"
                validateObj.userName = false
                break;
            case !regExUsername.test(userName.value):
                /* apellido.classList.add('nocheck') */
                userName.style.border = '3px solid red'
                userName.style.color = 'red'
                errorUserName.style.display = 'block'
                checkUserName.style.display = 'none'
                smallUserName.innerHTML = "El nombre de usuario solo puede contener solo letras, números y guiones"
                validateObj.userName = false
                break;
            default:
                /* userName.classList.remove('nocheck') */
                userName.classList.add('check')
                userName.style.border = '3px solid green'
                userName.style.color = 'green'
                errorUserName.style.display = 'none'
                checkUserName.style.display = 'block'
                smallUserName.innerHTML = ""
                validateObj.userName = true
                break;
        }

        validateFunction(validateObj)
    })

    /* Email */
    email.addEventListener('input', () => {

        switch (true) {
            case !email.value:
                /* email.classList.add('nocheck') */
                email.style.border = '3px solid red'
                email.style.color = 'red'
                errorEmail.style.display = 'block'
                checkEmail.style.display = 'none'
                smallEmail.innerHTML = 'El campo email no puede estar vacío'
                validateObj.email = false
                break;
            case !regExEmail.test(email.value):
                /* email.classList.add('nocheck') */
                email.style.border = '3px solid red'
                email.style.color = 'red'
                errorEmail.style.display = 'block'
                checkEmail.style.display = 'none'
                smallEmail.innerHTML = 'Debes ingresar un email válido'
                validateObj.email = false
                break;
            default:
                /* email.classList.remove('nocheck') */
                email.classList.add('check')
                email.style.border = '3px solid green'
                email.style.color = 'green'
                errorEmail.style.display = 'none'
                checkEmail.style.display = 'block'
                smallEmail.innerHTML = ''
                validateObj.email = true
                break;
        }

        validateFunction(validateObj)
    })

    /* Teléfono */
    telefono.addEventListener('input', () => {
        switch (true) {
            case !telefono.value:
                /* telefono.classList.add('nocheck') */
                telefono.style.border = '3px solid red'
                telefono.style.color = 'red'
                errorTelefono.style.display = 'block'
                checkTelefono.style.display = 'none'
                smallTelefono.innerHTML = "El campo teléfono no puede estar vacío"
                validateObj.telefono = false
                break;
            case telefono.value.length < 7:
                /* telefono.classList.add('nocheck') */
                telefono.style.border = '3px solid red'
                telefono.style.color = 'red'
                errorTelefono.style.display = 'block'
                checkTelefono.style.display = 'none'
                smallTelefono.innerHTML = "El teléfono debe tener como mínimo 7 números"
                validateObj.telefono = false
                break;
            case telefono.value.length > 14:
                /* teléfono.classList.add('nocheck') */
                telefono.style.border = '3px solid red'
                telefono.style.color = 'red'
                errorTelefono.style.display = 'block'
                checkTelefono.style.display = 'none'
                smallTelefono.innerHTML = "El número de teléfono es demasiado largo"
                validateObj.telefono = false
                break;
            case !regExTel.test(telefono.value):
                /* apellido.classList.add('nocheck') */
                telefono.style.border = '3px solid red'
                telefono.style.color = 'red'
                errorTelefono.style.display = 'block'
                checkTelefono.style.display = 'none'
                smallTelefono.innerHTML = "El campo teléfono solo puede contener números"
                validateObj.telefono = false
                break;
            default:
                /* userName.classList.remove('nocheck') */
                telefono.classList.add('check')
                telefono.style.border = '3px solid green'
                telefono.style.color = 'green'
                errorTelefono.style.display = 'none'
                checkTelefono.style.display = 'block'
                smallTelefono.innerHTML = ""
                validateObj.telefono = true
                break;
        }

        validateFunction(validateObj)
    })

    /* Imagen */

    imagen.addEventListener('change', () => {

        switch (true) {
            case !regExImg.exec(imagen.value):
                imagen.style.backgroundColor = 'red'
                imagen.style.color = 'white'
                imagen.style.boxShadow = 'none'
                smallImagen.innerHTML = 'Solo se permiten imágenes con extensión jpg, jpeg, png, gif y webp'
                validateObj.imagen = false
                break;
            case imagen.files[0].size > fileSize:
                imagen.style.backgroundColor = 'red'
                imagen.style.color = 'white'
                imagen.style.boxShadow = 'none'
                smallImagen.innerHTML = 'La imagen debe pesar menos de 2MB'
                validateObj.imagen = false
                break;
            default:
                imagen.style.boxShadow = '0px 1px 10px rgb(23 158 5)'
                imagen.style.backgroundColor = 'white'
                imagen.style.color = 'black'
                smallImagen.innerHTML = ''
                validateObj.imagen = true
                break;
        }

        validateFunction(validateObj)
    })
    

})