window.addEventListener('load', () => {
    
    const qs = (tag) => {
        return document.querySelector(tag);
    }

    // Query selector All //
    const qsAll = (tag) => {
        return document.querySelectorAll(tag)
    }

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
})