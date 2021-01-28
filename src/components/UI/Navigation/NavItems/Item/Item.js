import React from 'react'
import styles from './Item.module.css'
import { NavLink } from 'react-router-dom'

export default function Item(props) {
    return (
        <div className={styles.Item}>
            <li>
            <NavLink 
                to={props.link} 
                exact={props.exact}
                activeClassName={styles.active}>{props.children}</NavLink>
            </li>
        </div>
    )
}
