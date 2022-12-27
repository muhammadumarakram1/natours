/* eslint-disable*/
import axios from 'axios';
import { showAlert } from './alert';

const stripe = Stripe(
  'pk_test_51MJElkKRAyM2muOIoWyNTeT6qMVy4cUur13hbAvvzhcJUl2PgpzqCPRWkUYNfJLFQ4kS8l6yhC9enLboPss34cqu00wh60x4Nw'
);
export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout from endpoint
    const session = await axios(
      `http://localhost:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (error) {
    showAlert('error', error);
  }
};
