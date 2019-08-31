import React, { Component } from "react";
import { connect } from "react-redux";
import * as shopActions from "../../actions/shop.action";
import { Formik } from "formik";
import "./payment.css";
import { TransactionRequest } from "./../../models/transaction"

class Payment extends Component {
  isMustChanged = values => {
    try {
      const { shopReducer } = this.props;
      return values.given > shopReducer.mTotalPrice;
    } catch (err) {
      return false;
    }
  };

  updateChange = (given, setFieldValue) => {
    let change = given - this.props.shopReducer.mTotalPrice;
    if (change > 0) {
      setFieldValue("change", change);
    } else {
      setFieldValue("change", 0);
    }
  };

  onClickGiven = (newValue, oldValue, setFieldValue) => {
    debugger;
    const newGiven = newValue + oldValue;
    setFieldValue("given", newGiven);
    this.updateChange(newGiven, setFieldValue);
  };

  onClickExact = (setFieldValue) => {
    setFieldValue("given", this.props.shopReducer.mTotalPrice);
    this.updateChange(0, setFieldValue);
  };

  showChangeField = values => {
    return (
      <div className="form-group" style={{ marginTop: 8 }}>
        <label htmlFor="change">Change</label>
        <input
          type="text"
          style={{ fontSize: 30, height: 50, borderRadius: 5 }}
          disabled
          value={values.change}
          className="form-control"
          name="change"
          id="change"
        />
      </div>
    );
  };

  onClickSubmit = (values) => {
    const { props } = this;
    let trans = new TransactionRequest();
    trans.total = props.shopReducer.mTotalPrice;
    trans.paid = values.given;
    trans.change = values.change;
    trans.payment_type = "cash";
    trans.payment_detail = "full";
    trans.seller_id = "sr0001";
    trans.buyer_id = "by0000";
    trans.order_list = "1234";
    this.props.submitPayment(trans);
  };

  showForm = ({ values, handleChange, handleSubmit, setFieldValue }) => {
    return (
      <form>
        <section
          style={{ backgroundColor: "rgb(255, 254, 254)", padding: 100 }}
        >
          <div className="form-group">
            <div className="form-group" style={{ marginTop: 8 }}>
              <label htmlFor="paid">Paid</label>
              <span
                style={{ fontSize: 30, height: 50, borderRadius: 5 }}
                className="currencyinput form-control"
              >
                ฿
                <input
                  value={values.given}
                  type="text"
                  style={{ fontSize: 30, height: 45 }}
                  name="given"
                  onChange={event => this.updateChange(event.target.value)}
                  id="paid"
                />
              </span>
            </div>

            {this.isMustChanged(values) && this.showChangeField(values)}
            <div className="row">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around"
                }}
              >
                <div
                  className="note_button"
                  onClick={() =>
                    this.onClickGiven(1000, values.given, setFieldValue)
                  }
                >
                  ฿1,000
                </div>
                <div
                  className="note_button"
                  onClick={() =>
                    this.onClickGiven(500, values.given, setFieldValue)
                  }
                >
                  ฿500
                </div>
                <div
                  className="note_button"
                  onClick={() =>
                    this.onClickGiven(100, values.given, setFieldValue)
                  }
                >
                  ฿100
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around"
                }}
              >
                <div
                  className="note_button"
                  onClick={() =>
                    this.onClickGiven(50, values.given, setFieldValue)
                  }
                >
                  ฿50
                </div>
                <div
                  className="note_button"
                  onClick={() =>
                    this.onClickGiven(20, values.given, setFieldValue)
                  }
                >
                  ฿20
                </div>
                <div
                  className="note_button"
                  onClick={() =>
                    this.onClickGiven(10, values.given, setFieldValue)
                  }
                >
                  ฿10
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around"
                }}
              >
                <div
                  className="col-sm-4 payment_button"
                  style={{ background: "rgb(149, 150, 147)" }}
                  onClick={() => setFieldValue("given", 0)}
                >
                  CLR
                </div>
                <div
                  className="col-sm-4 payment_button"
                  style={{ background: "#00a65a" }}
                  onClick={() => this.onClickExact(setFieldValue)}
                >
                  EXACT
                </div>
                <div
                  className="col-sm-4 payment_button"
                  style={{ background: "#D50000" }}
                  onClick={() => this.onClickSubmit(values)}
                >
                  SUBMIT
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    );
  };

  render() {
    return (
      <div className="row">
        <Formik initialValues={{ given: 0 }}>
          {props => this.showForm(props)}
        </Formik>
      </div>
    );
  }
}

const mapDispatchToProps = {
  ...shopActions
};

const mapStateToProps = ({ shopReducer }) => ({
  shopReducer
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Payment);
