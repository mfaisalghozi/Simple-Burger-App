import React, { Component } from 'react'
import Modal from '../../components/UI/Modal/Modal';
import aux from '../hoc';

const ErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        componentDidMount(){
            this.reqInterceptor = axios.interceptors.request.use(req=>{
                this.setState({error: null});
                return req;
            })
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error})
            })
        }

        componentWillUnmount(){
            console.log('will unmount');
            axios.interceptors.request.eject(this.reqINterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
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