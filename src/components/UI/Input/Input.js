import React from 'react'
import styles from './Input.module.css'

export default function Input(props) {
    let inputElement = null;
    switch(props.elementType){
        case ('input'):
            inputElement = <input className={styles.inputElement}  {...props.elementConfig} value={props.value} onChange={props.changed}/>
            break;
        case ('textarea'):
            inputElement = <textarea className={styles.inputElement} {...props.elementConfig} value={props.value} onChange={props.changed}/>
            break;
        case ('select'):
            inputElement = (
                <select onChange={props.changed}>
                    {props.elementConfig.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.displayValue}</option>
                    ))}
                </select>
            )
            break;
        default: 
            inputElement = <input className={styles.inputElement} {...props.elementConfig} value={props.value} onChange={props.changed}/>
    }
    return (
        <div className={styles.Input}>
            <label className={styles.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}
