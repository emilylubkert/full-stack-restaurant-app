import React, { useContext } from "react";
import { Row, Col } from "reactstrap";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/checkoutForm";
import {AppContext} from "../components/context";
import Cart from "../components/cart";

function Checkout() {
  const {isAuthenticated} = useContext(AppContext);

  const stripePromise = loadStripe(`pk_test_51KgY4PBc6t8a69KsUMIr7ocVVC3yMFzcdeTcC8SH8HDw1azbXycKbmMuSy909n8Wxqjvui2olMsPkFqqqdze1qwN00EPSEZDTi`);
  // const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_KEY}`);

  return (
    <Row>
      <Col style={{ paddingRight: 10 }} sm={{ size: 3, order: 1, offset: 2 }} md={4} lg={4}>
        <h1 style={{ textAlign:'center'}}>Checkout</h1>
        <Cart isAuthenticated={isAuthenticated} />
      </Col>
      <Col style={{ paddingLeft: 10 }} sm={{ size: 6, order: 2 }} md={6} lg={6}>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </Col>
    </Row>
  );
}
export default Checkout;
