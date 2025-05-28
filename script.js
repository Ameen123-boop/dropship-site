let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${name} added to cart`);
}

if (document.getElementById('cart-items')) {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  let total = 0;

  cart.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.textContent = `${item.name} - $${item.price}`;
    cartItems.appendChild(li);
    total += item.price;
  });

  cartTotal.textContent = total.toFixed(2);

  // PayPal Integration
  if (typeof paypal !== 'undefined') {
    paypal.Buttons({
      createOrder: function(data, actions) {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: total.toFixed(2)
            }
          }]
        });
      },
      onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
          alert('Transaction completed by ' + details.payer.name.given_name);
        });
      }
    }).render('#paypal-button-container');
  }
}
