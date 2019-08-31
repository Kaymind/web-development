import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "./../../actions/login.action"
import {Formik} from 'formik'
import { Link } from "react-router-dom";
import { server } from "../../constants";

class Login extends Component {

  componentDidMount() {
    if(localStorage.getItem(server.TOKEN_KEY != null)){
      this.props.history.push('/stock')
    }
  }

  showForm = ({values, handleChange, handleSubmit, setFieldValue, isSubmitting}) => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group has-feedback">
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={values.username}
            className="form-control"
            placeholder="Email"
          />
          <span className="glyphicon glyphicon-envelope form-control-feedback" />
        </div>
        <div className="form-group has-feedback">
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={values.password}
            className="form-control"
            placeholder="Password"
          />
          <span className="glyphicon glyphicon-lock form-control-feedback" />
        </div>
        <div className="row">
          <div className="col-xs-12">
            <button
              disabled={isSubmitting}
              type="submit"
              className="btn btn-primary btn-block btn-flat"
            >
              Sign In
            </button>
          </div>
          {/* /.col */}
        </div>

        <div className="row" style={{ marginTop: 8 }}>
          <div className="col-xs-12">
            <Link to="/register">
              <button className="btn btn-default btn-block btn-flat">
                Register
              </button>
            </Link>
          </div>
          {/* /.col */}
        </div>
      </form>
    )
  }

  render() {
    return (
      <div className="login-box">
        <div className="login-logo">
          <a href="../../index2.html">
            <b>Admin</b>LTE
          </a>
        </div>
        {/* /.login-logo */}
        <div className="login-box-body" style={{background: 'whitesmoke', borderRadius: 10}}>
          <p className="login-box-msg">Sign in to start your session</p>
          <Formik initialValues={{username:"",password:""}} onSubmit={(values,{setSubmitting}) => {
            this.props.login(values, this.props.history)
            setSubmitting(false)
          }}>
            { props => this.showForm(props)}
          </Formik>
          <span style={{color: 'red'}}>{this.props.loginReducer.result &&
            this.props.loginReducer.result.data.result !== 'ok' &&
            this.props.loginReducer.result.data.message}</span>
        </div>
        {/* /.login-box-body */}
      </div>
    );
  }
}

const mapStateToProps = ({loginReducer}) => ({
  loginReducer
})

const mapDispatchToProps = {
  login
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)
