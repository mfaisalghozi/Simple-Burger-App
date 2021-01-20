import React from 'react'
import Logo from '../../../Logo/Logo'
import NavItems from '../NavItems/NavItems'
import classes from './Toolbar.module.css'

export default function Toolbar(props) {
    return (
        <header className={classes.Toolbar}>
            <div>Menu</div>
            <Logo height="80%"/>
            <nav>
                <NavItems />
            </nav>
        </header>
    )
}
