import fetch from 'isomorphic-fetch';
import Cookie from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
const userToken = Cookie.get('token');

//create new cart
export async function createCart(user, setter) {
  await fetch(`${API_URL}/carts`, {
    method: "POST",
    headers: userToken && { Authorization: `Bearer ${userToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      total: 0,
      dishes: [],
      email: user.email,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      // console.log('createCart response', response);
      user.cart = {
        email: user.email,
        items: [],
        total: 0,
        id: response.id
      }
      setter(user);
    });
}

//get existing cart
export async function getCart(user, setter) {
  if (typeof window === "undefined") {
    return;
  }
  // console.log('get cart user', user)
  await fetch(`${API_URL}/carts/${user.email}`, {
    method: "GET",
    headers: userToken && { Authorization: `Bearer ${userToken}`, "Content-Type": "application/json" },
  
  })
    .then((response) => response.json())
    .then((response) => {
      // console.log('getCart response', response[0]);    
      if (!response[0] || response.length === 0) {
        createCart(user, setter);
        // console.log('create after get response', user.cart);
      }
      else {
        user.cart = {
          items: response[0].dishes,
          total: response[0].total,
          id: response[0].id,
          email: user.email
        }
        setter(user);
        // console.log('cart after get', user.cart)
        return user.cart
      }
    });
}

//update cart
export async function updateCart(cartItems, cartTotal, id, email) {
  const response = await fetch(`${API_URL}/carts/${id}`, {
    method: "PUT",
    headers: userToken && { Authorization: `Bearer ${userToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      id: id,
      total: cartTotal,
      dishes: cartItems,
      email
    }),
  });
  // console.log('update cart', response.body);
}

export async function clearCart(id, email) {
  const response = await fetch(`${API_URL}/carts/${email}`, {
    method: "PUT",
    headers: userToken && { Authorization: `Bearer ${userToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      id: id,
      total: 0,
      dishes: [],
      email
    }),
  });
  // console.log('clear cart', response.body);
}
