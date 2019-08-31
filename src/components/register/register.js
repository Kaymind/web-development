import React, { Component } from "react";
import { connect } from "react-redux";
import { register } from "./../../actions/register.action";
import { Formik } from "formik";

class Register extends Component {
  showForm = ({
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting
  }) => {
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
              Confirm
            </button>
          </div>
          {/* /.col */}
        </div>

        <div className="row" style={{ marginTop: 8 }}>
          <div className="col-xs-12">
            <button
            type="button"
            onClick={() => {
              this.props.history.goBack()
            }}
            className="btn btn-default btn-block btn-flat">
              Cancel
            </button>
          </div>
          {/* /.col */}
        </div>
      </form>
    );
  };
  render() {
    return (
      <div className="login-box">
        <div className="login-logo">
          <a href="../../index2.html">
            <b>Register</b>POS
          </a>
        </div>
        {/* /.login-logo */}
        <div
          className="login-box-body"
          style={{ background: "whitesmoke", borderRadius: 10 }}
        >
          <p className="login-box-msg">Sign in to start your session</p>
          <Formik
            onSubmit={(values, { setSubmitting }) => {
              this.props.register(values, this.props.history);
              setSubmitting(false);
            }}
          >
            {props => this.showForm(props)}
          </Formik>
          <span style={{color: 'red'}}>{this.props.registerReducer.result &&
            this.props.registerReducer.result.data.result !== 'ok' &&
            this.props.registerReducer.result.data.message}</span>

        </div>
        {/* /.login-box-body */}
      </div>
    );
  }
}

const mapStateToProps = ({ registerReducer }) => ({
  registerReducer
});

const mapDispatchToProps = {
  register
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
