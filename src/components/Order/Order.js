import React from 'react'
import styles from './Order.module.css'

export default function Order(props) {
    const ingredients = [];
    for(let inName in props.ingredients){
        ingredients.push({
            name: inName,
            amount: props.ingredients[inName]
        })
    }

    const ingredientOutput = ingredients.map(ig=>{
        return (
            <span 
                key={ig.name}
                style={{
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    margin: '0 8px',
                    border: '1px solid #ccc',
                    padding: '5px'
                    }}
            >{ig.name} ({ig.amount})</span>
        )
    })

    return (
        <div className={styles.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>{Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    )
}
