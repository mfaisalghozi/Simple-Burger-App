import React, { Component } from 'react'
import Aux from '../../hoc/hoc'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler'


const INGREDIENT_PRICES = {
    salad : 0.5,
    meat: 0.4,
    bacon: 3.7,
    cheese: 0.8
}

class BurgerBuilder extends Component {
    // constructor(props){
    //     super(props);
    //     this.state={...}
    // }
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchaseAble: false,
        purchasing: false,
        loading: false
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey=>{
                return ingredients[igKey]
            })
            .reduce((sum,el) => {
                return sum + el;
            },0);
        this.setState({purchaseAble: sum > 0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCounted = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCounted;
        const priceAddtion = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice+priceAddtion;
        this.setState({
            totalPrice : newPrice,
            ingredients : updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount<=0){
            return;
        }
            const updatedCounted = oldCount - 1;
            const updatedIngredients = {
                ...this.state.ingredients
            }
            updatedIngredients[type] = updatedCounted;
            const priceAddtion = INGREDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceAddtion;
            this.setState({
                totalPrice : newPrice,
                ingredients : updatedIngredients
            })
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // alert('You Continue!');
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'MrafCommand',
                address: {
                    street: 'Jalan Harapan 1',
                    zipCode: '14045',
                    country: 'Indonesia'
                },
                email: 'mrafgaming@gmail.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
             .then(resp => {
                 this.setState({loading: false, purchasing: false});
                 console.log(resp);
             })
             .catch(err => {
                 this.setState({loading: false, purchasing: false});
                 console.log(err);
            });
    }

    render() {
        const disableInfo = {
            ...this.state.ingredients
        }
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0
        }
        let orderSummary = <OrderSummary 
        ingredients={this.state.ingredients} 
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.state.totalPrice}
        /> ;
        if(this.state.loading){
            orderSummary = <Spinner />;
        }
        return (
            <Aux>
                <Modal modalClosed={this.purchaseCancelHandler} show={this.state.purchasing}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls ingredientAdded={this.addIngredientHandler}
                    ingredientRemove={this.removeIngredientHandler}
                    disabled={disableInfo}
                    price={this.state.totalPrice.toFixed(2)}
                    purchaseable={this.state.purchaseAble}
                    ordered={this.purchaseHandler}
                />
            </Aux>
        )
    }
}

export default ErrorHandler(BurgerBuilder, axios);
