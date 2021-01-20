import React from 'react'
import Aux from '../../hoc/hoc'
import Toolbar from '../UI/Navigation/Toolbar/Toolbar'
import styles from './Layout.module.css'

export default function Layout(props) {
    return (
        <Aux>
            <Toolbar />
            <main className={styles.Content}>
                {props.children}
            </main>
        </Aux>
    )
}
