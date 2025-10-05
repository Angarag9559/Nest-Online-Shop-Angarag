let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(product) {
  cart.push(product);
  saveCart();
  updateCartUI();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartUI();
}

function updateCartUI() {
  const cartCount = document.getElementById("cart-count");
  const cartItems = document.getElementById("cart-items");

  if (cartCount) {
    cartCount.textContent = cart.length;
  }

  if (!cartItems) return;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="text-gray-600">Таны Сагс хоосон байна.</p>';
    return;
  }

  let html = '<ul class="divide-y">';
  let total = 0;

  cart.forEach((item, index) => {
    html += `
      <li class="py-2 flex justify-between items-center">
        <span>${item.name}</span>
        <span class="flex items-center gap-4">
          $${item.price.toFixed(2)}
          <button onclick="removeFromCart(${index})" 
            class="text-red-500 hover:text-red-700 font-bold">✕</button>
        </span>
      </li>`;
    total += item.price;
  });

  html += `</ul>
           <div class="mt-4 text-right font-bold">Нийт: $${total.toFixed(2)}</div>
           <a href="checkout.html" 
              class="mt-4 inline-block bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition">
              Төлбөр хийх
           </a>`;

  cartItems.innerHTML = html;
}

window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartUI = updateCartUI;
