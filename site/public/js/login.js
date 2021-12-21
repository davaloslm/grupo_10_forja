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


})