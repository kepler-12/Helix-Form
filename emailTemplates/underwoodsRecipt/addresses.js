module.exports = ({deliveryAddress, billingAddress, delivery_options}) => {
  const dtitle = delivery_options === 'in_store_pickup' ? 'Pickup Person' : 'Delivery Address'
  return `
<div style="background-color:#edf1eb;display:block;padding:15px;margin:20px;justify-content:space-around">
  ${createAddressHtml(dtitle, deliveryAddress)}
  ${createAddressHtml('Billing Address', billingAddress)}
</div>`
}

function createAddressHtml(title, address) {
  return `
      <div style="text-align:center;">
        <h2 style="line-height:1.6">${title}:</h2>
        <p>${address.title} ${address.first_name} ${address.last_name}</p>
        <p>${address.street1 || ''} ${address.street2 || ''}</p>
        <p>${address.city ? address.city + ', ' : ''}<span> ${address.state || ''}</span><span> ${address.zip || ''}</span></p>
      </div>
  `
}
