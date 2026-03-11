export function cartCount(cartItems){
    let total = 0;

  cartItems && cartItems.forEach(element => {
    total += element.quantity;

  });
  return total;
}