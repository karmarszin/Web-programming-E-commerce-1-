const KEY = "cart";
let cart = JSON.parse(localStorage.getItem(KEY) || "[]");
const save = () => localStorage.setItem(KEY, JSON.stringify(cart));
const count = () => cart.reduce((n, i) => n + i.qty, 0);
const total = () => cart.reduce((n, i) => n + i.qty * i.price, 0);
function addItem(id) {
  const p = PRODUCTS.find((x) => x.id === id);
  const item = cart.find((i) => i.id === id);
  if (item) item.qty++;
  else cart.push({ id: p.id, title: p.title, price: p.price, qty: 1 });
  save();
}
function removeItem(id) { cart = cart.filter((i) => i.id !== id); save(); }
function setQty(id, qty) {
  const item = cart.find((i) => i.id === id);
  if (!item) return;
  if (qty < 1) return removeItem(id);
  item.qty = qty;
  save();
}
