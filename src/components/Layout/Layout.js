import React, { Component } from 'react'
import Aux from '../../hoc/hoc'
import SideDrawer from '../UI/Navigation/SideDrawer/SideDrawer'
import Toolbar from '../UI/Navigation/Toolbar/Toolbar'
import styles from './Layout.module.css'

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {
                showSideDrawer: !prevState.showSideDrawer
            }
        })
    }

    render() {
        return (        
        <Aux>
            <Toolbar drawToogle={this.sideDrawerToggleHandler}/>
            <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
            <main className={styles.Content}>
                {this.props.children}
            </main>
        </Aux>)
    }
}

export default Layout