import React, { Component } from 'react'
import Aux from '../../../hoc/hoc'
import Button from '../../UI/Button/Button';


class OrderSummary extends Component {
    componentDidUpdate(){
        console.log('[OrderSummary] will update');
    }

    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey=>{
            return (<li key={igKey}>{igKey} : {this.props.ingredients[igKey]}</li>)
        });

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>Delicious Burger with the following ingredients : </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: ${this.props.price}</strong></p>
            <p><strong>Continue To Checkout ?</strong></p>
            <Button btnType="Danger" clicked={this.props.purchaseCanceled}>Cancel</Button>
            <Button btnType="Success" clicked={this.props.purchaseContinued}>Continue</Button>
        </Aux>
    )
    }
}

export default OrderSummary;