/* eslint-disable */
import axios from 'axios';

import { showAlert } from './alert';

export const bookTour = async (tourId) => {
  try {
    const stripe = Stripe(
      'pk_test_51JjJL1SF3eG66OdBY6uMWJ7r6cXlRVni6l1UfBi3xdhSARZr2lkG6qZquKi3mehqJhuYyzwyTLGVCrTWrqvOoQ5k00VjWEVoZN'
    );
    // 1) Get checkout session from API
    const session = await axios(
      `http://localhost:8000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log('session', session);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
