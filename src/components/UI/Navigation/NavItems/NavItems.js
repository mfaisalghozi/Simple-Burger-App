import React from 'react'
import Item from './Item/Item'
import styles from './NavItems.module.css'

export default function NavItems() {
    return ( 
        <ul className={styles.NavItems}>
            <Item link="/" active>Burger Builder</Item>
            <Item link="/">checkout</Item>
        </ul>
    )
}
