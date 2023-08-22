import React from "react"


function NavbarItem( {render, ...props} ){    
    console.log('Boleano do Render')
    if(render){
        console.log('Entrou no Render True')
        return(
            <li className="nav-item">
                <a onClick={props.onClick} className="nav-link" href={props.href}>{props.label}</a>
            </li>
        )
    }else{
        console.log('Entrou no Render False')
        return false
    }

}
export default NavbarItem

