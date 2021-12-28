window.addEventListener('load', () =>{


    const qs = (tag) => {
        return document.querySelector(tag)
    }

    // VALIDACION //
    var validate

    if(location.href.includes("create")){
        console.log("create");

        validate = {
            imagenDeProducto: false,
            nombreDeProducto: false,
            descripcion: false,
            marca: false,
            precio: false,
            stock: false,
            /* categoria: true, */
        }

    }else{
        console.log("edit");

        validate = {
            imagenDeProducto: true,
            nombreDeProducto: true,
            descripcion: true,
            marca: true,
            precio: true,
            stock: true,
            /* categoria: true, */
        }

        
    }


    // Función para validar en línea //
    const funcValidate = (obj) => {
        let arr = Object.values(validate)
        
        if (!arr.includes(false)) {
            bttnCrear.disabled = false
            bttnCrear.style.backgroundColor = '#2AD2D2'
        } else {
            bttnCrear.disabled = true
            bttnCrear.style.backgroundColor = 'gray'
        }
    }

    // Expresiones regulares //
    const regExLetras = /^[a-zA-ZÀ-ÿ\s]{2,}$/; // Letras y espacios,
    const regExNum = /^\d{1,9}$/; 
    const regExLetrasNumero=/^[a-zA-ZÀ-ÿ0-9\_\-/%&=".'+$@#!¡;()\s]{2,}$/;//letras y numeros
    const regExpNumeroLetra = /^[a-zA-Z0-9\_\-]{4,16}$/;
    const regExImg = /(.jpg|.jpeg|.png|.gif|.webp)$/i;//formato de imagen
    const fileSize = 2100000

    /* /////input///// */
    const imagenDeProducto = qs('#imagenDeProducto')
    const nombreDeProducto = qs('#nombreDeProducto')
    const descripcion = qs('#descripcion')
    const marca = qs('#marca')
    const precio = qs('#precio')
    const stock = qs('#stock')
    

    /* //////Icono////// */

    const checkNombreProducto = qs('#checkNombreProducto')
    const errorNombreProducto = qs('#errorNombreProducto')
    const checkDescripcion = qs('#checkDescripcion')
    const errorDescripcion = qs('#errorDescripcion')
    const checkMarca = qs('#checkMarca')
    const errorMarca = qs ('#errorMarca')
    const checkPrecio = qs('#checkPrecio')
    const errorPrecio = qs('#errorPrecio')
    const checkStock = qs('#checkStock')
    const errorStock = qs('#errorStock')

    /* ////Smalls////// */

    const smallImagenDeProducto = qs('#smallsImagenDeProducto')
    const smallNombreProducto = qs('#smallsNombreProducto')
    const smallDescripcion = qs('#smallsDescripcion')
    const smallMarca=qs('#smallsMarca')
    const smallPrecio = qs('#smallsPrecio')
    const smallStock = qs('#smallsStock')

    console.log(smallNombreProducto);

    
    const bttnCrear = qs('#send')

    bttnCrear.disabled = true
    bttnCrear.style.backgroundColor = 'gray'



    /* ///validacion de Nombre de producto//// */
    nombreDeProducto.addEventListener('input', ()=>{

    switch (true) {
        case !nombreDeProducto.value:
            nombreDeProducto.style.border = '3px solid red'
            nombreDeProducto.style.color = 'red'
            errorNombreProducto.style.display = 'block'
            checkNombreProducto.style.display = 'none'
            smallNombreProducto.innerHTML = "El campo nombre de producto no puede estar vacío"
            validate.nombreDeProducto = false
            break;
        case nombreDeProducto.value.length < 2:
            nombreDeProducto.classList.add('nocheck')
            nombreDeProducto.style.border = '3px solid red'
            nombreDeProducto.style.color = 'red'
            errorNombreProducto.style.display = 'block'
            checkNombreProducto.style.display = 'none'
            smallNombreProducto.innerHTML = "El nombre de producto debe tener como mínimo 2 letras"
            validate.nombreDeProducto = false
           break;

        case nombreDeProducto.value.length > 50:
            nombreDeProducto.classList.add('nocheck')
            nombreDeProducto.style.border = '3px solid red'
            nombreDeProducto.style.color = 'red'
            errorNombreProducto.style.display = 'block'
            checkNombreProducto.style.display = 'none'
            smallNombreProducto.innerHTML = "El nombre de producto es demasiado largo"
            validate.nombreDeProducto = false
            break;

        case !regExLetrasNumero.test(nombreDeProducto.value):
            nombreDeProducto.classList.add('nocheck')
            nombreDeProducto.style.border = '3px solid red'
            nombreDeProducto.style.color = 'red'
            errorNombreProducto.style.display = 'block'
            checkNombreProducto.style.display = 'none'
            smallNombreProducto.innerHTML = "El nombre de producto no puede tener estos carácteres '¿ ?', '< >' "
            validate.nombreDeProducto = false
            break;

        default:
            nombreDeProducto.classList.remove('nocheck')
            nombreDeProducto.classList.add('check')
            nombreDeProducto.style.border = '3px solid green'
            nombreDeProducto.style.color = 'green'
            errorNombreProducto.style.display = 'none'
            checkNombreProducto.style.display = 'block'
            smallNombreProducto.innerHTML = ''
            validate.nombreDeProducto = true
            break;
    

        }

        funcValidate(validate)
    })


  descripcion.addEventListener('input', () => {
    switch (true) {
        case !descripcion.value:
            descripcion.style.border = '3px solid red'
            descripcion.style.color = 'red'
            errorDescripcion.style.display = 'block'
            checkDescripcion.style.display = 'none'
            smallDescripcion.innerHTML = "El campo Description no puede estar vacío"
            validate.descripcion = false  
            break;

        case descripcion.value.length < 2:
            descripcion.style.border = '3px solid red'
            descripcion.style.color = 'red'
            errorDescripcion.style.display = 'block'
            checkDescripcion.style.display = 'none'
            smallDescripcion.innerHTML = "La descripcion debe tener como mínimo 2 letras"
            validate.descripcion = false
            break;

        case descripcion.value.length > 1000:
            descripcion.style.border = '3px solid red'
            descripcion.style.color = 'red'
            errorDescripcion.style.display = 'block'
            checkDescripcion.style.display = 'none'
            smallDescripcion.innerHTML = "La descripcion es demasiado largo"
            validate.descripcion = false
            break;
        
          default:
            descripcion.classList.remove('nocheck')
            descripcion.classList.add('check')
            descripcion.style.border = '3px solid green'
            descripcion.style.color = 'green'
            errorDescripcion.style.display = 'none'
            checkDescripcion.style.display = 'block'
            smallDescripcion.innerHTML = ""
            validate.descripcion = true
              break;
    }

    funcValidate(validate)
  })

  ///Marca///

    marca.addEventListener('input', () => {
        switch (true) {
            case !marca.value:
                marca.classList.add('nocheck')
                marca.style.border = '3px solid red'
                marca.style.color = 'red'
                errorMarca.style.display = 'block'
                checkMarca.style.display = 'none'
                smallMarca.innerHTML = 'El campo marca no puede estar vacío'
                validate.marca = false
                break;
            case !regExLetrasNumero.test(marca.value):
                marca.classList.add('nocheck')
                marca.style.border = '3px solid red'
                marca.style.color = 'red'
                errorMarca.style.display = 'block'
                checkMarca.style.display = 'none'
                smallMarca.innerHTML = 'Debes ingresar un marca válido'
                validate.marca = false
                break;
            default:
                marca.classList.remove('nocheck')
                marca.classList.add('check')
                marca.style.border = '3px solid green'
                marca.style.color = 'green'
                errorMarca.style.display = 'none'
                checkMarca.style.display = 'block'
                smallMarca.innerHTML = ''
                validate.marca = true
                break;
        }

        funcValidate(validate)
    })

    precio.addEventListener('input', () => {

        switch (true) {
            case !precio.value:
                precio.style.border = '3px solid red'
                precio.style.color = 'red'
                errorPrecio.style.display = 'block'
                checkPrecio.style.display = 'none'
                smallPrecio.innerHTML = 'El campo precio no puede estar vacío'
                validate.precio = false
                break;
            case precio.value.length > 9:
                precio.style.border = '3px solid red'
                precio.style.color = 'red'
                errorPrecio.style.display = 'block'
                checkPrecio.style.display = 'none'
                smallPrecio.innerHTML = "El número es demasiado largo"
                validate.precio = false
                break;
            case !regExNum.test(precio.value):
                precio.style.border = '3px solid red'
                precio.style.color = 'red'
                errorPrecio.style.display = 'block'
                checkPrecio.style.display = 'none'
                smallPrecio.innerHTML = "El campo precio solo puede contener números"
                validate.precio = false
                break;
            default:
                precio.classList.add('check')
                precio.style.border = '3px solid green'
                precio.style.color = 'green'
                errorPrecio.style.display = 'none'
                checkPrecio.style.display = 'block'
                smallPrecio.innerHTML = ''
                validate.precio = true
                break;
        }

        funcValidate(validate)
    })

    stock.addEventListener('input', () => {
        switch (true) {
            case !stock.value:
                stock.style.border = '3px solid red'
                stock.style.color = 'red'
                errorStock.style.display = 'block'
                checkStock.style.display = 'none'
                smallStock.innerHTML = "El campo stock no puede estar vacío"
                validate.stock = false
                break;
            case stock.value.length < 2:
                stock.style.border = '3px solid red'
                stock.style.color = 'red'
                errorStock.style.display = 'block'
                checkStock.style.display = 'none'
                smallStock.innerHTML = "El stock debe tener como mínimo 2 letras"
                validate.stock = false
                break;
                ////////
            case stock.value.length > 9:
                stock.style.border = '3px solid red'
                stock.style.color = 'red'
                errorStock.style.display = 'block'
                checkStock.style.display = 'none'
                smallStock.innerHTML = "El número es demasiado largo"
                validate.stock = false
                break;
            case !regExNum.test(stock.value):
                stock.style.border = '3px solid red'
                stock.style.color = 'red'
                errorStock.style.display = 'block'
                checkStock.style.display = 'none'
                smallStock.innerHTML = "El campo stock solo puede contener números"
                validate.stock = false
                break;

            default:
                stock.classList.add('check')
                stock.style.border = '3px solid green'
                stock.style.color = 'green'
                errorStock.style.display = 'none'
                checkStock.style.display = 'block'
                smallStock.innerHTML = ''
                validate.stock = true
                break;
        }

        funcValidate(validate)
    })

    ///imagen/////

    imagenDeProducto.addEventListener('change', () => {

        let previewsDiv = qs("#previews")

        switch (true) {
            case !regExImg.exec(imagenDeProducto.value):
                /* Borrado de imágenes anteriores */
                while (previewsDiv.firstChild) {
                    previewsDiv.removeChild(previewsDiv.firstChild);
                  }

                imagenDeProducto.classList.add('nocheck')
                imagenDeProducto.style.backgroundColor = 'red'
                imagenDeProducto.style.color = 'white'
                imagenDeProducto.style.boxShadow = 'none'
                smallImagenDeProducto.innerHTML = 'Solo se permiten imágenes con extensión jpg, jpeg, png, gif y webp'
                validate.imagenDeProducto = false
                break;
            case imagenDeProducto.files[0].size > fileSize:
                /* Borrado de imágenes anteriores */
                while (previewsDiv.firstChild) {
                    previewsDiv.removeChild(previewsDiv.firstChild);
                }
                
                imagenDeProducto.classList.add('nocheck')
                imagenDeProducto.style.backgroundColor = 'red'
                imagenDeProducto.style.color = 'white'
                imagenDeProducto.style.boxShadow = 'none'
                smallImagenDeProducto.innerHTML = 'La imagenDeProducto debe pesar menos de 2MB'
                validate.imagenDeProducto = false
                break;
            default:
                console.log(imagenDeProducto.files[0]);
                /* Previsualización de imagen */

                /* Borrado de imágenes anteriores */
                while (previewsDiv.firstChild) {
                    previewsDiv.removeChild(previewsDiv.firstChild);
                  }
                
                for ( i = 0; i < imagenDeProducto.files.length; i++) {
                    previewsDiv.appendChild(document.createElement("img")).src = URL.createObjectURL(imagenDeProducto.files[i])
                    
                }
         
                imagenDeProducto.classList.remove('nocheck')
                imagenDeProducto.classList.add('check')
                imagenDeProducto.style.boxShadow = '0px 1px 10px rgb(23 158 5)'
                imagenDeProducto.style.backgroundColor = 'white'
                imagenDeProducto.style.color = 'black'
                smallImagenDeProducto.innerHTML = ''
                validate.imagenDeProducto = true
                break;
        }

        funcValidate(validate)
    })
})
