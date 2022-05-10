import { useContext, useState } from 'react';
import Head from 'next/head';
import { AppContext } from '../components/context';
import Layout from '../components/layout';
import { updateCart } from '../components/cartAPI';

function MyApp(props) {
  var { cart, addItem, removeItem, user, setUser } = useContext(AppContext);
  const [state, setState] = useState(null);
  const { Component, pageProps } = props;
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

  setUser = (user) => {
    setState(user);
  };

  addItem = async (item) => {
    let { items } = state.cart;
    let foundItem = true;
    if (items.length > 0) {
      foundItem = items?.find((i) => i.id === item.id);

      if (!foundItem) foundItem = false;
    } else {
      foundItem = false;
    }
    if (!foundItem) {
      let temp = JSON.parse(JSON.stringify(item));
      temp.quantity = 1;
      var newCart = {
        items: [...items, temp],
        total: state.cart.total + item.price,
        id: state.cart.id,
      };
    } else {
      newCart = {
        items: items.map((item) => {
          if (item.id === foundItem.id) {
            return Object.assign({}, item, { quantity: item.quantity + 1 });
          } else {
            return item;
          }
        }),
        total: state.cart.total + item.price,
        id: state.cart.id,
      };
    }
    setState({ cart: newCart });
    let strapiCart = newCart;
    updateCart(strapiCart.items, strapiCart.total, strapiCart.id, state.email);
  };

  removeItem = async (item) => {
    let { items } = state.cart;
    const foundItem = items.find((i) => i.id === item.id);
    if (foundItem.quantity > 1) {
      var newCart = {
        items: items.map((item) => {
          if (item.id === foundItem.id) {
            return Object.assign({}, item, { quantity: item.quantity - 1 });
          } else {
            return item;
          }
        }),
        total: state.cart.total - item.price,
        id: state.cart.id,
      };
    } else {
      const index = items.findIndex((i) => i.id === foundItem.id);
      items.splice(index, 1);
      var newCart = {
        items: items,
        total: state.cart.total - item.price,
        id: state.cart.id,
      };
    }
    setState({ cart: newCart });
    let strapiCart = newCart;
    updateCart(strapiCart.items, strapiCart.total, strapiCart.id, state.email);
  };

  return (
    <AppContext.Provider
      value={{
        cart: state ? state.cart : null,
        addItem: addItem,
        removeItem: removeItem,
        isAuthenticated: !!state,
        user: state,
        setUser: setUser,
      }}
    >
      <Head>
        <link
          rel='stylesheet'
          href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'
          integrity='sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm'
          crossOrigin='anonymous'
        />
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContext.Provider>
  );
}

export default MyApp;
