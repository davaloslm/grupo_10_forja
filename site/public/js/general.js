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
    const divsSubmenu = document.querySelectorAll("div.submenu");
    const divSubmenuTkd = qs("div#submenu0");
    const divSubmenuBoxeo = qs("div#submenu1");
    console.log(divSubmenuBoxeo);
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

    console.log(divsSubmenu);
   

   

    

    spansCategorias[0].addEventListener("click", ()=>{
        console.log(divSubmenuTkd.style.maxHeight );
        if(divSubmenuTkd.style.maxHeight == "0" ){
            divSubmenuTkd.style.maxHeight = "300px";
            for (let i = 0; i < aMenuTkd.length; i++) {
            aMenuTkd[i].style.opacity = "100"
            console.log("if");
            }
        }
        if(divSubmenuTkd.style.maxHeight != "0px" ){
            divSubmenuTkd.style.maxHeight = "0px";
            for (let i = 0; i < aMenuTkd.length; i++) {
            aMenuTkd[i].style.opacity = "0"
            console.log("else");
            }
        }

        
    })
    spansCategorias[1].addEventListener("click", ()=>{
        divSubmenuBoxeo.style.maxHeight = "300px"
        for (let i = 0; i < aMenuBoxeo.length; i++) {
            aMenuBoxeo[i].style.opacity = "100"
            
        }
        
    })
    spansCategorias[2].addEventListener("click", ()=>{
        divSubmenuKick.style.maxHeight = "300px"
        for (let i = 0; i < aMenuKick.length; i++) {
            aMenuKick[i].style.opacity = "100"
            
        }
        
    })
    spansCategorias[3].addEventListener("click", ()=>{
        divSubmenuJudo.style.maxHeight = "300px"
        for (let i = 0; i < aMenuJudo.length; i++) {
            aMenuJudo[i].style.opacity = "100"
            
        }
        
    })
    spansCategorias[4].addEventListener("click", ()=>{
        divSubmenuJiu.style.maxHeight = "300px"
        for (let i = 0; i < aMenuJiu.length; i++) {
            aMenuJiu[i].style.opacity = "100"
            
        }
        
    })
    spansCategorias[5].addEventListener("click", ()=>{
        divSubmenuEntrenam.style.maxHeight = "300px"
        for (let i = 0; i < aMenuEntrenam.length; i++) {
            aMenuEntrenam[i].style.opacity = "100"
            
        }
        
    })

          

    


})