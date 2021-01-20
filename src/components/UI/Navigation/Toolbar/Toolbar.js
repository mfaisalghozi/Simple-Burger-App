import React from 'react'
import Logo from '../../../Logo/Logo'
import NavItems from '../NavItems/NavItems'
import DrawerToggle from './DrawerToggler/DrawerToggle'
import classes from './Toolbar.module.css'

export default function Toolbar(props) {
    return (
        <header className={classes.Toolbar}>
            <DrawerToggle clicked={props.drawToogle}/>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav className={classes.DekstopOnly}>
                <NavItems />
            </nav>
        </header>
    )
}
