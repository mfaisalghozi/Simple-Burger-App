import { checkPropTypes } from 'prop-types'
import React from 'react'
import BuildControl from './BuildControl/BuildControl';
import styles from './BuildControls.module.css'

const controls = [
    {label : 'Salad', type: 'salad'},
    {label : 'Bacon', type: 'bacon'},
    {label : 'Cheese', type: 'cheese'},
    {label : 'Meat', type: 'meat'}
];

export default function BuildControls(props) {
    return (
        <div className={styles.BuildControls}>
            <p>Current Price: <strong>${props.price}</strong></p>
            {controls.map(ctrl=>(<BuildControl  
            key={ctrl.label} 
            label={ctrl.label}
            added={()=>props.ingredientAdded(ctrl.type)} 
            removed={()=>props.ingredientRemove(ctrl.type)}
            disabled={props.disabled[ctrl.type]}
            />))
            }
            <button className={styles.OrderButton} disabled={!props.purchaseable} onClick={props.ordered}>Order Now</button>
        </div>
    )
}
