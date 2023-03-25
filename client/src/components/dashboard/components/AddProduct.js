import React, { Component } from "react";
import Input from "../../general/Input";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { message } from "antd";
import { addProduct } from "../../../actions/productAction";

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      price: "",
      brand: "",
      quantity: "",
      category: "",
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = () => {
    const { name, description, price, brand, quantity, category } = this.state;
    const newProduct = {
      name,
      description,
      price,
      brand,
      quantity,
      category,
    };
    console.log(newProduct);
    if (name.length <= 0) {
      return message.error("name field is required");
    }
    if (description.length <= 0) {
      return message.error("description field is required");
    }

    this.props.addProduct(newProduct, this.props.history);
  };
  render() {
    const { name, description, price, brand, quantity, category } = this.state;
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Add product</h1>
        <Input
          type="text"
          placeholder="name of product"
          name="name"
          value={name}
          onChange={this.onChange}
          style={{ width: "360px", height: "35px" }}
        />
        <Input
          type="text"
          placeholder="Give a brief description of product"
          name="description"
          value={description}
          onChange={this.onChange}
          style={{ width: "360px", height: "35px" }}
        />
        <Input
          type="number"
          placeholder="Enter the price of this product"
          name="price"
          value={price}
          onChange={this.onChange}
          style={{ width: "360px", height: "35px" }}
        />
        <Input
          type="text"
          placeholder="Enter the brand of this product"
          name="brand"
          value={brand}
          onChange={this.onChange}
          style={{ width: "360px", height: "35px" }}
        />
        <Input
          type="number"
          placeholder="Enter quantity"
          name="quantity"
          value={quantity}
          onChange={this.onChange}
          style={{ width: "360px", height: "35px" }}
        />
        <div className="form-group">
          <select
            style={{ width: "360px", height: "35px" }}
            name="category"
            value={category}
            onChange={this.onChange}
          >
            <option value="0"> Select a category for this product</option>
            <option value="Clothing"> Clothing</option>
            <option value="Electronics"> Electronics</option>
            <option value="Office Supply"> Office Supply</option>
            <option value="Automotive Supply"> Automotive Supply</option>
            <option value="Cosmetics"> Cosmetics</option>
          </select>
        </div>
        <button className="btn btn-primary" onClick={this.onSubmit}>
          Submit
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products,
});

export default connect(mapStateToProps, { addProduct })(withRouter(AddProduct));
