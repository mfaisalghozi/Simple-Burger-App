import React from 'react'
import burgerLogo from '../../assets/images/burger-logo.png'
import styles from './Logo.module.css'

export default function Logo(props) {
    return (
        <div className={styles.Logo} style={{height: props.height}}>
            <img src={burgerLogo} alt="Burger-Logo" />
        </div>
    )
}
