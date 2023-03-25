import React, { Component } from "react";
import { connect } from "react-redux";
import { getInstructorProducts } from "../../../actions/productAction";
import Product from "../../general/Product";
import { decodeUser } from "../../../util";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      merchantProducts: [],
    };
  }

  componentDidMount() {
    this.props.getInstructorProducts(decodeUser().user.id);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps &&
      nextProps.products &&
      nextProps.products.products.length > 0
    ) {
      const merchantProducts = nextProps.products.products;
      this.setState({ merchantProducts });
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
    const { merchantProducts } = this.state;
    return (
      <div className="row">
        {merchantProducts.map((product, index) => (
          <Product
            key={index}
            product={product}
            description={this.productDetails(product)}
            uploadImages={`/dashboard/products/${product._id}/addImages`}
            thumbnail={product.thumbnail}
            showBtn={true}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products,
});
export default connect(mapStateToProps, { getInstructorProducts })(Products);
