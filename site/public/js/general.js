window.addEventListener('load', () => {
    // console.log('Se vinculó correctamente');

    // Query selector //
    const qs = (tag) => {
        return document.querySelector(tag)
    }

    const burgerMenu = qs('#burgerMenu')
    const sideNav = qs('div.menu')
    const closeMenu = qs('#close')

    burgerMenu.addEventListener('click', () => {
        sideNav.style.display = 'block'
    })

    closeMenu.addEventListener('click', () => {
        sideNav.style.display = 'none'
    })


})