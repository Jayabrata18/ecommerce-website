import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { getServer } from "../../util";
import { message } from "antd";

export default class Payment extends Component {
  constructor(props) {
    super(props);
    this.handleToken = this.handleToken.bind(this);
  }

  async handleToken(token) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const context = { token, cart: this.props.cart, total: this.props.total };
    const res = await axios.post(`${getServer()}/api/payment`, context, config);
    console.log(res.data);
    if (res.data.status === 200) {
      message.success("Thank you for the payment");
    } else {
      message.error("something went wrong");
    }
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <StripeCheckout
          stripeKey="pk_test_51H8FIqKQHKlGO0KXSAJvY2HARHD5jOVevVTxSPvZt2p2YYRsncr3KSbaXX4orz7yhAccHrIZw0CHlcvYP6FpMpnX00PvzRfeXX"
          token={this.handleToken}
          shippingAddress
          billingAddress
          amount={this.props.total * 100}
          name="Complete Transaction"
        />
      </div>
    );
  }
}
