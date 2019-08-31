import React, { Component } from "react";
import "./shop.css"; // Tell Webpack that Button.js uses these styles

import { connect } from "react-redux";
import Payment from "../payment";
import * as stockActions from "../../actions/stock.action";
import * as shopActions from "../../actions/shop.action";
import { imageUrl } from "./../../constants";
import NumberFormat from "react-number-format";

class Shop extends Component {
  renderPayment = () => {
    return (
      <div className="col-md-8" style={{ maxHeight: 710 }}>
        <Payment />
      </div>
    );
  };

  isSelectedItem = product => {
    let index = this.props.shopReducer.mOrderLines.indexOf(product);
    return index != -1;
  };

  renderOrderRows = () => {
    const { mOrderLines } = this.props.shopReducer;

    return mOrderLines.map(item => (
      <li key={item.product_id} className="order_row">
        <table
          style={{
            width: "100%",
            marginLeft: 8,
            paddingRight: 2,
            marginRight: 0,
            borderRightStyle: "solid",
            borderColor: "red"
          }}
        >
          <tbody>
            <tr>
              <td className="td_orderline">
                <div className="image_product_list_item">
                  <img
                    alt="to be done"
                    src={`${imageUrl}/images/${item.image}`}
                    style={{ marginBottom: 10, height: 100, width: 100 }}
                  />
                </div>
                <div className="title_product_list_item">{item.name}</div>
                <div>
                  <NumberFormat
                    value={item.price}
                    displayType={"text"}
                    thousandSeparator={true}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    prefix={"฿"}
                  />
                  <br />
                  {item.qty} pcs.
                  <span
                    style={{ float: "right", padding: 6 }}
                    onClick={() => this.props.removeOrder(item)}
                  >
                    <img
                      alt="to be done"
                      src={`${process.env.PUBLIC_URL}/images/delete.png`}
                      className="nbutton_delete"
                      style={{ marginRight: 16, cursor: "pointer" }}
                    />
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </li>
    ));
  };

  renderProductRows = () => {
    const { result } = this.props.stockReducer;
    return (
      <div className="col-md-8" style={{ maxHeight: 710, overflowY: "scroll" }}>
        <div className="row">
          {result != null &&
            result.map((item, i) => (
              <div
                key={i}
                className="col-sm-4 col-md-3 newpadding_item"
                onClick={() => this.props.addOrder(item)}
                style={{ cursor: "pointer" }}
              >
                <div className="card">
                  <div className="thumbnail" style={{ marginBottom: 0 }}>
                    <img
                      alt="to be done"
                      src={`${imageUrl}/images/${item.image}`}
                      className="portrait"
                      style={{ marginTop: 15, width: "100%", opacity: "0.85" }}
                    />
                  </div>
                  <span
                    className={
                      this.isSelectedItem(item)
                        ? "nprice_tag_selected"
                        : "nprice_tag"
                    }
                  >
                    D{item.product_id} / ฿{item.price}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  };

  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    return (
      <div className="content-wrapper disable_text_highlighting">
        <section className="content">
          <div className="row">
            <div className="col-md-4">
              <div style={{ maxWidth: "100%" }}>
                <ul
                  className="card"
                  style={{
                    height: 490,
                    maxHeight: 490,
                    overflowX: "hidden",
                    cursor: "pointer"
                  }}
                >
                  {this.props.shopReducer.mOrderLines.length > 0 ? (
                    this.renderOrderRows()
                  ) : (
                    <img
                      alt="to be done"
                      src={`${process.env.PUBLIC_URL}/images/waiting_for_sale.png`}
                      style={{ marginTop: 15, width: "100%", padding: 100 }}
                    />
                  )}
                </ul>

                <div className="card">
                  <div style={{ paddingTop: 16 }}>
                    {/* Tax */}
                    <div
                      className="row"
                      style={{ paddingLeft: 12, paddingRight: 12 }}
                    >
                      <div
                        className="col-md-6 pull-left"
                        style={{ color: "#777777" }}
                      >
                        <b style={{ fontSize: 20, fontWeight: 100 }}>Tax 7%</b>
                      </div>
                      <div
                        className="col-md-6"
                        style={{ textAlign: "right", marginBottom: 16 }}
                      >
                        <span>
                          <b style={{ fontSize: 18, fontWeight: 100 }}>
                            <NumberFormat
                              value={this.props.shopReducer.mTaxAmt}
                              displayType={"text"}
                              decimalScale={2}
                              thousandSeparator={true}
                              prefix={"฿"}
                            />
                          </b>
                        </span>
                      </div>
                    </div>
                    {/* Grand-total */}
                    <div
                      className="row"
                      style={{ paddingLeft: 12, paddingRight: 12 }}
                    >
                      <div
                        className="col-md-2 pull-left"
                        style={{ color: "#777777" }}
                      >
                        <b style={{ fontSize: 20 }}>Total</b>
                      </div>
                      <div
                        className="col-md-10"
                        style={{ textAlign: "right", marginBottom: 16 }}
                      >
                        <span>
                          <b style={{ fontSize: 27, color: "red" }}>
                            <NumberFormat
                              value={this.props.shopReducer.mTotalPrice}
                              displayType={"text"}
                              thousandSeparator={true}
                              decimalScale={2}
                              fixedDecimalScale={true}
                              prefix={"฿"}
                            />
                          </b>
                        </span>
                      </div>
                    </div>
                    <button
                      disabled={
                        !(this.props.shopReducer.mTotalPrice > 0) &&
                        !this.props.shopReducer.mIsPaymentMade
                      }
                      className="payment_btn btn btn-default"
                      onClick={this.props.togglePaymentState}
                    >
                      <strong>Payment</strong>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {this.props.shopReducer.mIsPaymentMade
              ? this.renderPayment()
              : this.renderProductRows()}
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = ({ stockReducer, shopReducer }) => ({
  stockReducer,
  shopReducer
});

const mapDispatchToProps = {
  ...stockActions,
  ...shopActions
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Shop);
