module.exports = ({lineItems, total}) => {
  let lineItemsHtml = ''
  Object.keys(lineItems).forEach(key => {
    lineItemsHtml += createLineItemsHtml(key, lineItems[key])
  })
  return `
  <div style="border-top:thin solid black;width:80%;margin:auto;text-transform:uppercase;margin-bottom:20px;">
    ${lineItemsHtml}
    ${createLineItemsHtml('total', total)}
  </div>
  `
}

function createLineItemsHtml(lineItem, lineItemValue) {
  return `
  <div style="display:block;justify-content:center;align-items:center;">
    <h4 style="">${lineItem}:</h4>
    <p style="">$${lineItemValue}</p>
  </div>
  `
}
