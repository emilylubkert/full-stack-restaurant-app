import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Card, CardBody, CardTitle, Badge } from 'reactstrap';
import {AppContext} from './context';
import Link from 'next/link';


function Cart() {
  var { user, cart, addItem, removeItem, isAuthenticated, setUser } =
    useContext(AppContext);

  const getUserCart = async () => {
    if (user) {
      // console.log('get user cart', user.cart);
      setUser({cart: user.cart})
      // console.log('cart set', cart)
      // console.log('cart user', user)
    }
  };

  useEffect(() => {
    getUserCart();
  }, []);

  const router = useRouter();
  // console.log('in Cart:', cart);

  const renderCart = () => {
    if (cart && cart.items.length) {
      var itemList = cart.items.map((item) => {
        if (item.quantity > 0) {
          return (
            <div
              className='items-one'
              style={{ marginBottom: 15 }}
              key={item.id}
            >
              <div>
                <span id='item-price'>&nbsp; ${item.price}</span>
                <span id='item-name'>&nbsp; {item.name}</span>
              </div>
              <div>
                <Button
                  style={{
                    height: 25,
                    padding: 0,
                    width: 15,
                    marginRight: 5,
                    marginLeft: 10,
                  }}
                  onClick={() => addItem(item)}
                  color='link'
                >
                  +
                </Button>
                <Button
                  style={{
                    height: 25,
                    padding: 0,
                    width: 15,
                    marginRight: 10,
                  }}
                  onClick={() => removeItem(item)}
                  color='link'
                >
                  -
                </Button>
                <span style={{ marginLeft: 5 }} id='item-quantity'>
                  {item.quantity}x
                </span>
              </div>
            </div>
          );
        }
      });
      return itemList;
    } else {
      return <div></div>;
    }
  };

  const checkoutCart = () => {
    return (
      <div>
        <Badge style={{ width: 200, paddingRight: 10 }} color='light'>
          <h5 style={{ fontWeight: 100, color: 'gray' }}>Total:</h5>
          <h3>${cart ? cart.total.toFixed(2): 0}</h3>
        </Badge>

        {router.pathname !== '/checkout' ? (
          <Link href='/checkout/'>
            <Button style={{ width: '30%' }} color='info'>
              <a>Order</a>
            </Button>
          </Link>
        ) : null}
      </div>
    );
  };

  return (
    <div>
      <h4> Cart </h4>
      <Card style={{ padding: '10px 5px' }} className='cart'>
        {isAuthenticated ? (<>
        <CardTitle>Your Order:</CardTitle>
        <hr />
        <CardBody style={{ padding: 10 }}>
          <div style={{ marginBottom: 6 }}>
            <small>Items:</small>
          </div>
          <div>{renderCart()}</div>
          <div>{isAuthenticated ? checkoutCart() : <></>}</div>
        </CardBody></>) : <CardTitle style={{ margin: 10 }}>Log In to Order</CardTitle> }
      </Card>
      <style jsx>{`
        #item-price {
          font-size: 1.3em;
          color: rgba(97, 97, 97, 1);
        }
        #item-quantity {
          font-size: 0.95em;
          padding-bottom: 4px;
          color: rgba(158, 158, 158, 1);
        }
        #item-name {
          font-size: 1.3em;
          color: rgba(97, 97, 97, 1);
        }
      `}</style>
    </div>
  );
}
export default Cart;
