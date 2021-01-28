import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import styles from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'

export class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '', 
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'FromContactData',
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
                 this.setState({loading: false});
                 console.log(resp);
                 this.props.history.push('/');
             })
             .catch(err => {
                 this.setState({loading: false});
                 console.log(err);
            });
    }


    render() {
        let form = (
            <form>
                <input className={styles.Input} type="text" name="name" placeholder="your name" />
                <input className={styles.Input} type="email" name="email" placeholder="email" />
                <input className={styles.Input} type="text" name="street" placeholder="street" />
                <input className={styles.Input} type="text" name="postalCode" placeholder="postal code" />
                <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
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
