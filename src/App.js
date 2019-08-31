import React, { Component } from "react";
import Header from "./components/header";
import Menu from "./components/menu/menu";
import Footer from "./components/footer/footer";
import Login from "./components/login/login";
import Register from "./components/register/register";
import StockCreate from "./components/stockCreate/stockCreate";
import StockEdit from "./components/stockEdit/stockEdit";
import Stock from "./components/stock/stock";
import Shop from "./components/shop/shop";
import Report from "./components/report/report";
import Transaction from "./components/transaction/transaction";
import "./App.css"

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { server } from './constants'
import { connect } from 'react-redux';

//isLoggedIn
const isLoggedIn = () => {
  return localStorage.getItem(server.TOKEN_KEY) != null
}

// Protected Route
const SecuredRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
     //ternary condition
     isLoggedIn() === true ? (
       <Component {...props} />
     )
     : <Redirect to="/login" />
    }
  />
);

class App extends Component{

  redirectToLogin = () => {
    return <Redirect to="/login" />
  }

  render() {
    return (
      <Router basename={process.env.REACT_APP_IS_PRODUCTION == 1 ? "/demo" : ""}>
        <div>
          {isLoggedIn() && <Header />}
          {isLoggedIn() && <Menu />}
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <SecuredRoute path="/stock" component={Stock}/>
          <SecuredRoute path="/stock-create" component={StockCreate}/>
          <SecuredRoute path="/stock-edit/:id" component={StockEdit}/>
          <SecuredRoute path="/shop" component={Shop}/>
          <SecuredRoute path="/report" component={Report} />
          <SecuredRoute path="/transaction" component={Transaction} />
          <SecuredRoute exact={true} path="/" component={this.redirectToLogin}/>
          {isLoggedIn() && <Footer />}
        </div>
      </Router>
    );
  }
}

const mapStateToProps = ({loginReducer}) => ({
  loginReducer
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(App)