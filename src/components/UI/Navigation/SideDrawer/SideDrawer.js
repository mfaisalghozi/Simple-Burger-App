import React from 'react'
import Logo from '../../../Logo/Logo'
import NavItems from '../NavItems/NavItems'
import styles from './SideDrawer.module.css'
import Aux from '../../../../hoc/hoc'
import Backdrop from '../../Backdrop/Backdrop'

export default function SideDrawer(props) {
    let attachedClasses=[styles.SideDrawer, styles.Close];
    if(props.open){
        attachedClasses=[styles.SideDrawer, styles.Open];
    }
    return (
        <Aux>
        <Backdrop show={props.open} clicked={props.closed}/>
        <div className={attachedClasses.join(' ')}>
            <div className={styles.Logo}>
                <Logo />
            </div>
            <nav className={styles.DekstopOnly}>
                <NavItems />
            </nav>
        </div>
        </Aux>
    )
}
