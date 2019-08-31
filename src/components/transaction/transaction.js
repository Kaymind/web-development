import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./../../actions/transaction.action";
import Moment from "react-moment";
import NumberFormat from "react-number-format";

class Transaction extends Component {
  componentDidMount() {
    this.props.getTransactions();
  }

  createRows = () => {
    const { result } = this.props.transactionReducer;
    return (
      result != null &&
      result.map(item => (
        <tr style={{ cursor: "pointer" }}>
          <td className="td_left" style={{ width: "5%" }}>
            {item.transaction_id}
          </td>
          <td className="td_left" style={{ width: "%" }}>
            <Moment format="YYYY/MM/DD">{item.timestamp}</Moment>
          </td>
          <td className="td_left" style={{ width: "5%" }}>
            <Moment format="HH:mm">{item.timestamp}</Moment>
          </td>
          <td className="td_left" style={{ width: "10%" }}>
            {item.staff_id}
          </td>
          <td className="td_left" style={{ width: "20%" }}>
            GENERAL
          </td>
          <td className="td_left" style={{ width: "10%", fontWeight: 900 }}>
            <NumberFormat
              value={item.total}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"฿"}
            />
          </td>
          <td className="td_left" style={{ width: "10%" }}>
            <NumberFormat
              value={item.paid}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"฿"}
            />
          </td>
          <td className="td_left" style={{ width: 10 }}>
            {JSON.parse(item.order_list).length} SKU
          </td>
          <td className="td_left" style={{ width: "10%" }}>
            {item.payment_type}
          </td>
        </tr>
      ))
    );
  };

  render() {
    return (
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <h1>Transaction</h1>
          <ol className="breadcrumb">
            <li>
              <a href="#/">
                <i className="fa fa-dashboard" /> Home
              </a>
            </li>
            <li>
              <a href="#/">Examples</a>
            </li>
            <li className="active">404 error</li>
          </ol>
        </section>
        {/* Main content */}
        <section className="content">
          <table
            id="transaction_table"
            className="table table-bordered table-striped table-hover"
            style={{ height: 300, maxHeight: 300 }}
          >
            <thead>
              <tr>
                <th style={{ width: "5%" }}>ID</th>
                <th className="th_center" style={{ width: "5%" }}>
                  DATE
                </th>
                <th className="th_center" style={{ width: "10%" }}>
                  TIME
                </th>
                <th className="th_center" style={{ width: "10%" }}>
                  STAFF
                </th>
                <th className="th_center" style={{ width: "10%" }}>
                  CUSTOMER
                </th>
                <th className="th_center" style={{ width: "10%" }}>
                  TOTAL
                </th>
                <th className="th_center" style={{ width: "10%" }}>
                  PAID
                </th>
                <th className="th_center" style={{ width: "10%" }}>
                  #SKU
                </th>
                <th className="t_center" style={{ width: "10%" }}>
                  WAY
                </th>
              </tr>
            </thead>
            <tbody>{this.createRows()}</tbody>
          </table>
        </section>
        {/* /.content */}
      </div>
    );
  }
}

const mapStateToProps = ({ transactionReducer }) => ({
  transactionReducer
});

const mapDispatchToProps = {
  ...actions
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transaction);
