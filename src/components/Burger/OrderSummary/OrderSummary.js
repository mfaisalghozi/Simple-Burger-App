import React from 'react'
import Aux from '../../../hoc/hoc'
import Button from '../../UI/Button/Button';


export default function OrderSummary(props) {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey=>{
            return (<li key={igKey}>{igKey} : {props.ingredients[igKey]}</li>)
        });

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>Delicious Burger with the following ingredients : </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: ${props.price}</strong></p>
            <p><strong>Continue To Checkout ?</strong></p>
            <Button btnType="Danger" clicked={props.purchaseCanceled}>Cancel</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>Continue</Button>
        </Aux>
    )
}
