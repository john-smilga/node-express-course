const stripe = require('stripe')(process.env.STRIPE_KEY);

const stripeController = async (req, res) => {
  const { purchase, total_amount, shipping_fee } = req.body;

  const calculateOrderAmount = () => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return total_amount + shipping_fee;
  };
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(),
    currency: 'usd',
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};

module.exports = stripeController;
