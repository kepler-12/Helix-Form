module.exports = (products) => {
  return products.map(createProductHtml)
}

function createProductHtml(product) {
  return `
      <div style="border-top:thin solid black;width:80%;margin:auto;">
        <img style="width:200px;margin-top:10px;" src="${product.image}" alt="product image">
        <h4 style="">${product.title}</h4>
        <p style="">ITEM # ${product.sku}</p>
        <p style="">QTY: ${product.quantity}</p>
        <div style="display:block;text-align:center;">
          <h5 style="">Price:</h5>
          <p style="">$${product.price}</p>
        </div>
    `
}
