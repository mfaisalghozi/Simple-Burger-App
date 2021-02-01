import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import styles from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

export class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touch: false,
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touch: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touch: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touch: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touch: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{value:'fastest', displayValue: 'Fastest'},
                              {value:'normal', displayValue: 'Normal'},
                              {value:'slowest', displayValue: 'Slowest'}]
                },
                validation: {},
                value: 'fastest',
                valid: true
            }
        },
        formIsValid: false,
        loading: false
    }

    checkValidity(value,rules){
        let isValid = true;

        if(!rules){
            return true;
        }

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid = value.length <= rules.minLength && isValid;
        }

        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const formData = {};
        for(let el in this.state.orderForm){
            formData[el] = this.state.orderForm[el].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData
        }
        axios.post('/orders.json', order)
             .then(resp => {
                 this.setState({loading: false});
                 console.log(resp);
                 this.props.history.push('/');
             })
             .catch(err => {
                 this.setState({loading: false});
                 console.log(err);
            });
    }

    inputChangedHandler = (event, elementId) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[elementId]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touch = true;
        updatedOrderForm[elementId] = updatedFormElement;

        let formIsValid = false;
        for(let el in updatedOrderForm){
            formIsValid = updatedOrderForm[el].valid && formIsValid;
        }

        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid
        })
    }


    render() {
        const formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id: key, 
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map((formElement,index) => (
                    <Input  key={formElement.id} 
                            elementType={formElement.config.elementType} 
                            elementConfig={formElement.config.elementConfig} 
                            value={formElement.config.value}
                            changed={(event) => this.inputChangedHandler(event,formElement.id)}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touch}
                    />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.orderHandler}>Order</Button>
            </form>
        );
        if(this.state.loading){
            form = <Spinner />
        }

        return (
            <div className={styles.ContactData}>
                <h4>Enter Contact Data</h4>
                {form}
            </div>
        )
    }
}
export default ContactData