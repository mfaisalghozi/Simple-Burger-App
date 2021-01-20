import React from 'react'
import Logo from '../../../Logo/Logo'
import NavItems from '../NavItems/NavItems'
import styles from './SideDrawer.module.css'

export default function SideDrawer() {
    return (
        <div className={styles.SideDrawer}>
            <Logo height="11%"/>
            <nav>
                <NavItems />
            </nav>
        </div>
    )
}
