window.addEventListener('load', () => {
    // console.log('Se vinculó correctamente');

    // Query selector //
    const qs = (tag) => {
        return document.querySelector(tag)
    }

    // Query selector All //
    const qsAll = (tag) => {
        return document.querySelectorAll(tag)
    }


    const slider = qs('#slider')

    const bttnRight = qs('#bttnRight')
    const bttnLeft = qs('#bttnLeft')

    // Función siguiente imagen //
    function Next() {
        let articulos = qsAll('#articles')
        let priArticulo = articulos[0]
        slider.style.marginLeft = '-200%'
        slider.style.transition = 'all 0.5s'
        setTimeout(function() {
            slider.style.transition = 'none'
            slider.insertAdjacentElement('beforeend', priArticulo)
            slider.style.marginLeft = "-100%"
        }, 500);
    }

    // Función anterior imagen //
    function Prev() {
        let articulos = qsAll('#articles')
        let ultArticulo = articulos[2]
        slider.style.marginLeft = '0%'
        slider.style.transition = 'all 0.5s'
        setTimeout(function() {
            slider.style.transition = 'none'
            slider.insertAdjacentElement('afterbegin', ultArticulo)
            slider.style.marginLeft = "-100%"
        }, 500);
    }

    bttnRight.addEventListener('click', () => {
        Next()
    })

    bttnLeft.addEventListener('click', () => {
        Prev()
    })

    // Carrusel automático //
    setInterval(() => {
        Next()
    }, 5000);


    // Go Top //
    const goTop = qs('#goTop')

    let goTopRefresh = () => {
        if(document.documentElement.scrollTop <= 2250) {
            goTop.style.display = 'none'
        } else {
            goTop.style.display = 'block'
        }
    }

    goTopRefresh();

    goTop.addEventListener('click', (e) => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    })

    document.addEventListener('scroll', () => {
        goTopRefresh()
    })

})