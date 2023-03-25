import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Spin, Button, Rate, Modal, Alert } from "antd";
import { Link } from "react-router-dom";
import { isEmpty } from "lodash";
import { getProduct } from "../../actions/productAction";
import { addToCart } from "../../actions/cartActions";
import { getProfile } from "../../actions/profileActions";
import Navbar from "../../components/general/NavBar";
import { decodeUser } from "../../util";

class productDetails extends Component {
  constructor() {
    super();
    this.state = {
      product: null,
      visible: false,
      images: [],
      gotProfile: false,
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getProduct(id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.product) {
      const product = nextProps.product;
      let images = [];
      images.push(product.thumbnail);
      images = [...images, ...product.images];
      this.setState({ product, images });
      if (!this.state.gotProfile) {
        this.props.getProfile(product.userId);
        this.setState({ gotProfile: true });
      }
    }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  registerModal = (product) => {
    return (
      <Modal
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" onClick={this.handleCancel}>
            Close
          </Button>,
        ]}
      >
        <div>
          <br />
          <Alert
            message={
              <center>
                <span>
                  <strong>Added</strong> {product.name} to Cart
                </span>
              </center>
            }
            type="success"
          />
          <br />
          <center>
            <Link to="/cart?redirect=/cart">
              <Button key="submit" type="primary">
                Go to Cart
              </Button>
            </Link>
          </center>
        </div>
      </Modal>
    );
  };

  async addProductToCart(product) {
    //check id user is signed in
    //if not use localstorage
    if (!localStorage.getItem("token")) {
      const productExists = !isEmpty(localStorage.getItem("products"));
      if (productExists) {
        const products = JSON.parse(localStorage.getItem("products"));
        products.push(product._id);
        this.showModal();
        return localStorage.setItem("products", JSON.stringify([product._id]));
      } else {
        this.showModal();
        return localStorage.setItem("products", JSON.stringify([product._id]));
      }
    }

    const userId = decodeUser().user.id;
    const context = { products: [product._id], userId };
    await this.props.addToCart(context);
    this.showModal();
  }

  render() {
    const { product, images } = this.state;
    const { profile } = this.props;
    console.log(this.props.profile);
    let facebook,
      instagram,
      twitter,
      linkedin = "";
    if (profile) {
      if (
        profile.socialMedia.facebook &&
        !profile.socialMedia.facebook.substring(0, 4).includes("http")
      ) {
        facebook = `http${profile.socialMedia.facebook}`;
      } else {
        facebook = profile.socialMedia.facebook;
      }
      if (
        profile.socialMedia.instagram &&
        !profile.socialMedia.instagram.substring(0, 4).includes("http")
      ) {
        instagram = `http${profile.socialMedia.instagram}`;
      } else {
        instagram = profile.socialMedia.instagram;
      }
      if (
        profile.socialMedia.twitter &&
        !profile.socialMedia.twitter.substring(0, 4).includes("http")
      ) {
        twitter = `http${profile.socialMedia.twitter}`;
      } else {
        twitter = profile.socialMedia.twitter;
      }
      if (
        profile.socialMedia.linkedin &&
        !profile.socialMedia.linkedin.substring(0, 4).includes("http")
      ) {
        linkedin = `http${profile.socialMedia.linkedin}`;
      } else {
        linkedin = profile.socialMedia.linkedin;
      }
    }
    return (
      <Fragment>
        <Navbar />
        <div className="container">
          {product ? (
            <Fragment>
              <div className="row">
                <div
                  id="carousel-thumb"
                  className="carousel slide carousel-fade carousel-thumbnails"
                  data-ride="carousel"
                  style={{ width: "500px" }}
                >
                  <div className="carousel-inner" role="listbox">
                    {images.map((image, index) => (
                      <div
                        className={
                          index === 0
                            ? "carousel-item active"
                            : "carousel-item "
                        }
                        key={index}
                      >
                        <img
                          className="d-block w-100"
                          src={image}
                          alt="First slide"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <h1 style={{ margin: "0" }}>{product.name}</h1>
                  <p className="lead" style={{ margin: "0" }}>
                    Description: {product.description}
                  </p>
                  <p className="lead" style={{ margin: "0" }}>
                    Features:
                  </p>
                  {product.features ? (
                    <ul style={{ marginLeft: "5%", marginTop: "0" }}>
                      {product.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="lead">No feature Listed</p>
                  )}
                  <Rate
                    disabled
                    allowHalf
                    defaultValue={product.rating}
                    style={{ margin: "0" }}
                  />
                  <p className="lead" style={{ margin: "0" }}>
                    Quantity: {product.quantity}
                  </p>
                  <h1>${product.price}</h1>
                  <button
                    className="btn btn-primary"
                    onClick={(_) => this.addProductToCart(product)}
                  >
                    {" "}
                    Add to Cart
                  </button>
                </div>
              </div>
              <br />
              <hr />
              <br />
              <h1>Product Details</h1>
              <p className="lead">
                <b>{product.details}</b>
              </p>
              <p className="lead" style={{ margin: "0" }}>
                Main Features of Product:
              </p>
              {product.features ? (
                <ul style={{ marginLeft: "5%", marginTop: "0" }}>
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              ) : (
                <p className="lead">No Feature Listed</p>
              )}
            </Fragment>
          ) : (
            <Spin size="large" />
          )}
          <br />
          <h3>Seller Information</h3>
          {profile && (
            <Fragment>
              <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                  <a
                    className="nav-item nav-link active"
                    id="nav-home-tab"
                    data-toggle="tab"
                    href="#nav-home"
                    role="tab"
                    aria-controls="nav-home"
                    aria-selected="true"
                  >
                    Home
                  </a>
                  <a
                    className="nav-item nav-link"
                    id="nav-profile-tab"
                    data-toggle="tab"
                    href="#nav-profile"
                    role="tab"
                    aria-controls="nav-profile"
                    aria-selected="false"
                  >
                    Social Media
                  </a>
                  <a
                    className="nav-item nav-link"
                    id="nav-contact-tab"
                    data-toggle="tab"
                    href="#nav-contact"
                    role="tab"
                    aria-controls="nav-contact"
                    aria-selected="false"
                  >
                    Contact
                  </a>
                </div>
              </nav>
              <div className="tab-content" id="nav-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="nav-home"
                  role="tabpanel"
                  aria-labelledby="nav-home-tab"
                >
                  <br />
                  <h4 style={{ textDecoration: "underline" }}>About Seller</h4>
                  {profile.bio && <p className="lead">{profile.bio}</p>}
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-profile"
                  role="tabpanel"
                  aria-labelledby="nav-profile-tab"
                >
                  <br />
                  <h4>Follow Us with the links below:</h4>
                  <div className="row">
                    {facebook && (
                      <span className="social_icons">
                        <a href={facebook} target="_blank">
                          <i className="fab fa-facebook fa-2x"></i>
                        </a>
                      </span>
                    )}
                    {instagram && (
                      <span className="social_icons">
                        <a href={instagram} target="_blank">
                          <i className="fab fa-instagram fa-2x"></i>
                        </a>
                      </span>
                    )}
                    {twitter && (
                      <span className="social_icons">
                        <a href={twitter} target="_blank">
                          <i className="fab fa-twitter fa-2x"></i>
                        </a>
                      </span>
                    )}
                    {linkedin && (
                      <span className="social_icons">
                        <a href={linkedin} target="_blank">
                          <i className="fab fa-linkedin fa-2x"></i>
                        </a>
                      </span>
                    )}
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-contact"
                  role="tabpanel"
                  aria-labelledby="nav-contact-tab"
                >
                  <br />
                  {profile.address && (
                    <p className="lead">Address: {profile.address}</p>
                  )}
                </div>
              </div>
            </Fragment>
          )}
        </div>

        {product && this.registerModal(product)}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  product: state.products.product,
  profile: state.profile.profile,
});

export default connect(mapStateToProps, { getProduct, addToCart, getProfile })(
  productDetails
);
