window.addEventListener('load', () => {
    // console.log('Se vinculó correctamente');

    // Query selector //
    const qs = (tag) => {
        return document.querySelector(tag)
    }

    /* Burger Menu */
    const burgerMenu = qs('#burgerMenu')
    const sideNav = qs('div.menu')
    const closeMenu = qs('#close')

    burgerMenu.addEventListener('click', () => {
        sideNav.style.display = 'block'
    })

    closeMenu.addEventListener('click', () => {
        sideNav.style.display = 'none'
    })

    /* Menu desplegable */

    const spansCategorias = document.querySelectorAll("span");
    
    const divSubmenuTkd = qs("div#submenu0");
    const divSubmenuBoxeo = qs("div#submenu1");
    const divSubmenuKick = qs("div#submenu2");
    const divSubmenuJudo = qs("div#submenu3");
    const divSubmenuJiu = qs("div#submenu4");
    const divSubmenuEntrenam = qs("div#submenu5");
    
    const aMenuTkd = document.querySelectorAll("a.submenu0");
    const aMenuBoxeo = document.querySelectorAll("a.submenu1");
    const aMenuKick = document.querySelectorAll("a.submenu2");
    const aMenuJudo = document.querySelectorAll("a.submenu3");
    const aMenuJiu = document.querySelectorAll("a.submenu4");
    const aMenuEntrenam = document.querySelectorAll("a.submenu5");

   /* Funciones de deplegar y ocultar menu */
    const desplegar = (divSubmenu, aSubmenu)=>{
        divSubmenu.style.maxHeight = "300px";
        for (let i = 0; i < aSubmenu.length; i++) {
        aSubmenu[i].style.opacity = "100"
        }
    }
    const ocultar = (divSubmenu, aSubmenu)=>{
        divSubmenu.style.maxHeight = "0px";
        for (let i = 0; i < aSubmenu.length; i++) {
        aSubmenu[i].style.opacity = "0"
        }
    }
    /* Función que despliega u oculta*/
    const menu = (divSubmenu, aSubmenu) =>{
        if(divSubmenu.style.maxHeight != "300px"){
            desplegar(divSubmenu,aSubmenu)          
        }else{
            ocultar(divSubmenu,aSubmenu)
        }
    }
   
    /* Al desplegar un menu se ocultan los demás */
    
    /* TaeKwon-Do */
    spansCategorias[0].addEventListener("click", ()=>{

        menu(divSubmenuTkd, aMenuTkd);
        ocultar(divSubmenuBoxeo, aMenuBoxeo);
        ocultar(divSubmenuKick, aMenuKick);
        ocultar(divSubmenuJudo, aMenuJudo);
        ocultar(divSubmenuJiu, aMenuJiu);
        ocultar(divSubmenuEntrenam, aMenuEntrenam);
        
    })

    /* Boxeo */
    spansCategorias[1].addEventListener("click", ()=>{
        menu(divSubmenuBoxeo, aMenuBoxeo);
        ocultar(divSubmenuTkd, aMenuTkd);
        ocultar(divSubmenuKick, aMenuKick);
        ocultar(divSubmenuJudo, aMenuJudo);
        ocultar(divSubmenuJiu, aMenuJiu);
        ocultar(divSubmenuEntrenam, aMenuEntrenam);
    })
    
    /* KickBoxing/MuayThai */
    spansCategorias[2].addEventListener("click", ()=>{
        menu(divSubmenuKick, aMenuKick);
        ocultar(divSubmenuBoxeo, aMenuBoxeo);
        ocultar(divSubmenuTkd, aMenuTkd);
        ocultar(divSubmenuJudo, aMenuJudo);
        ocultar(divSubmenuJiu, aMenuJiu);
        ocultar(divSubmenuEntrenam, aMenuEntrenam);
    })
    
    /* Judo */
    spansCategorias[3].addEventListener("click", ()=>{
        menu(divSubmenuJudo, aMenuJudo);
        ocultar(divSubmenuTkd, aMenuTkd);
        ocultar(divSubmenuBoxeo, aMenuBoxeo);
        ocultar(divSubmenuKick, aMenuKick);
        ocultar(divSubmenuJiu, aMenuJiu);
        ocultar(divSubmenuEntrenam, aMenuEntrenam);
    })
    
    /* Jiu-Jitsu */
    spansCategorias[4].addEventListener("click", ()=>{
        menu(divSubmenuJiu, aMenuJiu);
        ocultar(divSubmenuTkd, aMenuTkd);
        ocultar(divSubmenuBoxeo, aMenuBoxeo);
        ocultar(divSubmenuKick, aMenuKick);
        ocultar(divSubmenuJudo, aMenuJudo);
        ocultar(divSubmenuEntrenam, aMenuEntrenam);
    })
    
    /* Entrenamiento */
    spansCategorias[5].addEventListener("click", ()=>{
        menu(divSubmenuEntrenam, aMenuEntrenam);
        ocultar(divSubmenuTkd, aMenuTkd);
        ocultar(divSubmenuBoxeo, aMenuBoxeo);
        ocultar(divSubmenuKick, aMenuKick);
        ocultar(divSubmenuJudo, aMenuJudo);
        ocultar(divSubmenuJiu, aMenuJiu);
    })
    
})