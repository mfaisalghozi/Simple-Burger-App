import React, { Component } from 'react'
import Modal from '../../components/UI/Modal/Modal';
import aux from '../hoc';

const ErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        componentDidMount(){
            axios.interceptors.request.use(req=>{
                this.setState({error: null});
                return req;
            })
            axios.interceptors.response.use(res => res, error => {
                this.setState({error: error})
            })
        }

        errorConfiirmedHandler = () => {
            this.setState({error: null})
        }

        render(){
            return (
                <aux>
                    <Modal show={this.state.error} modalClosed={this.errorConfiirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent />
                </aux>
            )
        }
    }
}


export default ErrorHandler;