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
        ingredients: null,
        totalPrice: 4,
        purchaseAble: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount(){
        console.log('Hello')
        console.log(this.props);
        axios.get('https://react-my-burger-cb14e-default-rtdb.firebaseio.com/ingredients.json')
             .then(resp =>{
                this.setState({
                    ingredients: resp.data
                })
             })
             .catch(err =>{
                this.setState({error: true})
             })
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
        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price='+this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?'+queryString
        })
    }

    render() {
        const disableInfo = {
            ...this.state.ingredients
        }

        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = this.state.error? "Ingredients Cant be loaded" : <Spinner />;
        
        if(this.state.ingredients){
             burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls ingredientAdded={this.addIngredientHandler}
                        ingredientRemove={this.removeIngredientHandler}
                        disabled={disableInfo}
                        price={this.state.totalPrice.toFixed(2)}
                        purchaseable={this.state.purchaseAble}
                        ordered={this.purchaseHandler} />
                </Aux> );
            orderSummary = <OrderSummary 
            ingredients={this.state.ingredients} 
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.state.totalPrice}
            /> ;
        };

        if(this.state.loading){
            orderSummary = <Spinner />;
        }
        return (
            <Aux>
                <Modal modalClosed={this.purchaseCancelHandler} show={this.state.purchasing}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

export default ErrorHandler(BurgerBuilder, axios);
