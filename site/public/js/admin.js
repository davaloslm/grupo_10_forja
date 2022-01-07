window.addEventListener('load', () => {

    // Query selector //
    const qs = (tag) => {
        return document.querySelector(tag)
    }

    const formularios = document.querySelectorAll('form.eliminarProductos')
    console.log(formularios)

    for (let i = 0; i < formularios.length; i++) {
        formularios[i].addEventListener('submit', event =>{
            event.preventDefault();
            Swal.fire({
                title: '¿Estas seguro?',
                text: "¡No podrás revertirlo una ves eliminado!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#2ad2d2',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar!',
                cancelButtonText: 'No, cancelar!'
            }).then((result) => {
                if(result.isConfirmed){
                    formularios[i].submit();
                }
            })
        }) ;
        
    }
    
})