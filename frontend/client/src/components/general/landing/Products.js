import React, { Component } from "react";
import { connect } from "react-redux";
import { getProducts } from "./../../../actions/productAction";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }
  componentDidMount() {
    this.props.getProducts();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.products.products) {
      const products = nextProps.products.products;
      this.setState({ products });
    }
  }
  productDetails = (product) => {
    return (
      <ul>
        <li>${product.price}</li>
        <li>quantity:{product.quantity}</li>
      </ul>
    );
  };
  render() {
    const { products } = this.state;
    return (
      <div className="container">
        <div className="row">
          {products.map((product, index) => (
            <Card
              key={index}
              hoverable
              style={{ width: 240 }}
              cover={
                <img
                  alt="example"
                  src="https://thumbs.dreamstime.com/b/bath-beauty-products-24145725.jpg"
                />
              }
            >
              <Meta
                title={product.name}
                description={this.productDetails(product)}
              />
            </Card>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products,
});

export default connect(mapStateToProps, { getProducts })(Products);
