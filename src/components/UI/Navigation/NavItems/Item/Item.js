import React from 'react'
import styles from './Item.module.css'

export default function Item(props) {
    return (
        <div className={styles.Item}>
            <li>
            <a href={props.link} className={props.active ? styles.active : null}>{props.children}</a>
            </li>
        </div>
    )
}
