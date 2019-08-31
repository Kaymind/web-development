import React, { Component } from "react";
import { connect } from "react-redux";
import "./stockCreate.css";
import * as actions from "./../../actions/stock.action";
import { Formik } from "formik";

class StockCreate extends Component {

  showPreviewImage = values => {
    if (values.file_obj) {
      return <img src={values.file_obj} style={{ height: 100 }} />;
    }
  };

  showForm = ({ values, handleChange, handleSubmit, setFieldValue }) => {
    return (
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="col-sm-2 control-label" htmlFor="name">
            Name
          </label>
          <div className="col-sm-10">
            <input
              name="name"
              onChange={handleChange}
              value={values.name}
              placeholder="โปรดระบุ"
              className="form-control"
              type="text"
              id="name"
            />
          </div>
        </div>
        <div className="form-group" style={{ marginBottom: 10 }}>
          <label className="col-sm-2 control-label" htmlFor="stock">
            Stock
          </label>
          <div className="col-sm-10">
            <div className="input-group">
              <input
                name="stock"
                onChange={handleChange}
                value={values.stock}
                className="form-control"
                type="number"
              />
              <span className="input-group-addon input-group-addon_custom">
                PCS.
              </span>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label" htmlFor="price">
            Price
          </label>
          <div className="col-sm-10">
            <div className="input-group">
              <input
                name="price"
                onChange={handleChange}
                value={values.price}
                className="form-control"
                type="number"
                id="price"
              />
              <span className="input-group-addon input-group-addon_custom">
                ฿
              </span>
            </div>
          </div>
        </div>

        <div className="form-group" style={{ marginTop: 15 }}>
          <div className="col-sm-12 col-sm-offset-2">
            {this.showPreviewImage(values)}

            <div className="wrap-upload-buttons control-label">
              <ul className="btn-nav row" id="rcorners">
                <li>
                  <span style={{ marginLeft: 2 }}>
                    <img
                      src={`${process.env.PUBLIC_URL}/images/ic_photo.png`}
                      style={{ width: 25, height: 20 }}
                    />
                    <span style={{ color: "#00B0CD", marginLeft: 10 }}>
                      Add Picture
                    </span>
                    <input
                      type="file"
                      onChange={e => {
                        e.preventDefault();
                        setFieldValue("file", e.target.files[0]); // for upload
                        setFieldValue("file_obj", URL.createObjectURL(e.target.files[0])); // for preview image
                      }}
                      name="image"
                      click-type="type1"
                      className="picupload"
                      multiple
                      accept="image/*"
                      id="files"
                      style={{ padding: "20px 0" }}
                    />
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="box-footer" style={{ marginTop: 50 }}>
          <button type="submit" className="btn btn-primary pull-right">
            Submit
          </button>
          <a
            onClick={() => {
              this.props.history.goBack();
            }}
            type="Button"
            className="btn btn-default pull-right"
            style={{ marginRight: 10 }}
          >
            Cancel
          </a>
        </div>
      </form>
    );
  };

  render() {
    return (
      <div className="content-wrapper">
        {/* Main content */}
        <section className="content" style={{ maxWidth: "80%" }}>
          <div className="box box-primary" style={{ marginTop: 70 }}>
            <div className="box-header with-border">
              <p className="box-title" style={{ fontSize: 30 }}>
                Create
              </p>
            </div>
            <div className="box-body" style={{ marginTop: 30 }}>
              <Formik
                initialValues={{ name: "", stock: 10, price: 90 }}
                onSubmit={(values, { setSubmitting }) => {
                  let formData = new FormData()
                  formData.append("name", values.name)
                  formData.append("price", values.price);
                  formData.append("stock", values.stock);
                  formData.append("image", values.file);
                  this.props.addProduct(formData)

                  setSubmitting(false);
                }}
              >
                {props => this.showForm(props)}
              </Formik>
            </div>
          </div>
        </section>
        {/* /.content */}
      </div>
    );
  }
}

const mapStateToProps = ({ stockReducer }) => ({
  stockReducer
});
const mapDispatchToProps = {
  ...actions
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StockCreate);
