const jsCart2 = document.querySelector(".cartItems");

let cart2 = JSON.parse(localStorage.getItem("cart")) || [];

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderCart() {
  if (!jsCart2) {
    return;
  }

  if (cart2.length === 0) {
    jsCart2.innerHTML = '<p role="status">Your cart is empty.</p>';
    return;
  }

  jsCart2.innerHTML = cart2
    .map((obj, index) => {
      const title = escapeHtml(obj.title);
      const shortTitle = escapeHtml(obj.title.split(" ").slice(0, 6).join(" "));
      const shortDescription = escapeHtml(
        obj.description.split(" ").slice(0, 15).join(" ")
      );

      return `
        <article class="prod">
          <div class="image">
            <img src="${escapeHtml(obj.image)}" alt="${title}">
          </div>
          <div class="description">
            <h3>${shortTitle}</h3>
            <p>${shortDescription}</p>
            <p class="current-price">$${escapeHtml(obj.price)}</p>
            
            <button 
              class="remove-btn" 
              onclick="removeItem(${index})"
              aria-label="Remove ${title} from cart"
            >
              Remove
            </button>
          </div>
        </article>
      `;
    })
    .join("");
}

function removeItem(index) {
  cart2.splice(index, 1); // Remove item from array
  
  localStorage.setItem("cart", JSON.stringify(cart2));
  
  renderCart();
}
renderCart();

