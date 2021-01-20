import React from 'react'
import styles from './Backdrop.module.css'

export default function Backdrop(props) {
    if(props.show){
        return (
            <div className={styles.Backdrop} onClick={props.clicked}>
            </div>
        )
    }else{
        return null
    }
}
