const addressesHTML = require('./addresses')
const productHTML = require('./products')
const pricingHTML = require('./pricingTotals')

module.exports = ({ confirmationCode, deliveryAddress, billingAddress, products, lineItems, total, delivery_options, deliveryMethod, addy }) => `
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <title>Underwood's Email Order Receipt</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body style="margin:0;font-family:Sans-Serif;max-width:800px;margin:auto;">
  <div style="background-color:#4c753d;display:block;text-align:center;">
    <img style="margin:auto;padding:20px;width:200px;filter:invert(100%);" src="https://s3.amazonaws.com/underwoods/logo.png" alt="underwood's company logo">
  <div>
  <div style="background-color:#ffffff;display:block;text-align:center;color:#596a73;">
    <div style="padding:20px;">
      <h2 style="">We've Received Your Order!</h2>
      ${createRegistryValues(products[0])}
      <p style="">Thank you for shopping with <a href="https://www.underwoodjewelers.com/" style="color:#596a73;text-decoration:none;">Underwood's</a>. We truly appreciate your business and look forward to helping you for many years to come. It's customers like you that have kept us in business since 1928.</p>
      <p style="font-size:10px;">Your order will be processed within two days. If you have any questions, please email <a href="mailto:info@underwoodjewelers.com" class="color:#596a73;text-decoration:none;">info@underwoodjewelers.com</a>.</p>
      <p style="font-size:14px;">Your confirmation code is: ${confirmationCode}</p>
      ${
  delivery_options === 'in_store_pickup' ? ' <p style="font-weight:bold">Your order will be at ' + deliveryMethod + ' ' + addy + ' in 2 business days.</p>' : ''
  }
    </div>
    ${addressesHTML({ deliveryAddress, billingAddress, delivery_options })}
    <div style="display:block;justify-content:center;">
      <h2 style="">Order Details:</h2>
      ${productHTML(products)}
      </div>
      ${pricingHTML({ lineItems, total })}
    </div>
  <div>

  <div style="background-color:#596a73;display:block;text-align:center;color:#fafcfc;padding-top:10px;">
    <h2 style="">Questions about Your Order?</h2>
    <p style="">Call us today at (904) 398-4363 or <a href="mailto:info@underwoodsjewelers.com" style="color:#fafcfc;text-decoration:none;"> click here to email our customer service</a>.</p>
  <div>

  <div style="background-color:#4c753d;color:#fafcfc;display:block;">
    <h4 style="padding:15px;">Thank you again for your order!</h4>
  <div>

  <div style="background-color:#dedede;padding:8px;">
    <p style="color:dimgrey;text-align:center;">&copy;2018 Program Powered by kepler12™</p>
  </div>
</body>

</html>
`

function createRegistryValues(product) {
  const { firstName, lastName, spouseFirstName, spouseLastName } = product.wishList;
  // if (!product.registry) {
  //   return `<p>For ${product.registry.firstName} ${product.registry.lastName} & ${product.registry.spouseFirstName} ${product.registry.spouseLastName}</p>`
  // }
  return `<p>For ${firstName} ${lastName} & ${spouseFirstName} ${spouseLastName}</p>`
}

