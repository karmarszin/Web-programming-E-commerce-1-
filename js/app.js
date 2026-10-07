const money = (n) => n.toLocaleString("ru-RU") + " ₽";
const el = (id) => document.getElementById(id);

function renderCart() {
  el("cart-count").textContent = count();
  el("cart-total").textContent = money(total());
  el("cart-items").innerHTML = cart.length
    ? cart.map((i) => `<div class="cart-row" data-id="${i.id}">
        <span>${i.title}</span>
        <input class="qty" type="number" min="1" value="${i.qty}">
        <span>${money(i.price * i.qty)}</span>
        <button type="button" class="btn-remove">Удалить</button>
      </div>`).join("")
    : "<p>Корзина пуста</p>";
}

document.querySelectorAll(".btn-add").forEach((btn) => {
  btn.onclick = () => { addItem(+btn.dataset.id); renderCart(); };
});
function closeCart() { el("cart-panel").hidden = true; }
el("cart-toggle-btn").onclick = () => { el("cart-panel").hidden = !el("cart-panel").hidden; };
el("cart-close-btn").onclick = closeCart;
el("checkout-btn").onclick = () => { el("order-modal").hidden = false; };
el("order-cancel").onclick = () => { el("order-modal").hidden = true; };
el("cart-items").onclick = (e) => {
  const row = e.target.closest(".cart-row");
  if (row && e.target.classList.contains("btn-remove")) { removeItem(+row.dataset.id); renderCart(); }
};
el("cart-items").onchange = (e) => {
  const row = e.target.closest(".cart-row");
  if (row && e.target.classList.contains("qty")) { setQty(+row.dataset.id, +e.target.value); renderCart(); }
};
el("order-form").onsubmit = (e) => {
  e.preventDefault();
  alert("Заказ создан!");
  el("order-modal").hidden = true;
  cart = [];
  save();
  renderCart();
};
renderCart();
