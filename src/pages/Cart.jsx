import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CartItem } from "../components";


const Cart = ({ cartItems, currency,  currencySymbol }) => {
  const Quantity = cartItems.reduce((acc, c) => acc + c.amount, 0);

  const subTotal = cartItems.reduce((acc, c) => acc + c.amount * c.prices.filter((item) => item.currency.label.toLowerCase() === currency)[0].amount, 0);

  return (
    <div >
      <P>Cart</P>
      {cartItems.length > 0 ? (
        <>
          {cartItems.map(
            ({
              id,
              name,
              gallery,
              inStock,
              prices,
              brand,
              attributes,
              amount,
              key
            }) => (
              <div key={id}>
                <CartItem
                  id={id}
                  name={name}
                  gallery={gallery}
                  inStock={inStock}
                  prices={prices}
                  brand={brand}
                  attributes={attributes}
                  amount={amount}
                  keyy={key}
                />
              </div>
            )
          )}
          <Hr />
          <Result>
            <div>Tax 21%: <span className="tax__span"> $42.00</span></div>
            <div>Quantity: <span className="tax__span">{Quantity}</span></div>
            <div>Total: <span className="total__span">{currencySymbol}{subTotal.toFixed(2)}</span></div>
            <button className="order__button">ORDER</button>
          </Result>
        </>
      ) : (
        <H2>
          Cart is empty
          <br />
          <Link to={"/"}> Back to shopping </Link>
        </H2>
      )}
    </div>
  );
};
const P = styled.p`
  font-size: 2rem;
  font-weight: 700;
  margin: 80px 0 55px;
`;

const Result = styled.div`
  div{
    font-size: 24px;
    font-weight: 400;
    margin-bottom: 20px;
    color: #1D1F22;
  }
  span {
    font-size: 24px;
    font-weight: 700;

  }
  button {
    background: #5ECE7B;
    padding: 1rem 2rem;
    width: 279px;
    height: 43px;
    color: #fff;
    font-size: 14px;
    font-weight: 700;
    border: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;

  }
`
const Hr = styled.hr`
  width: 100%;
  height: 1px;
  background-color: #E5E5E5;
  margin: 20px 0;
  text-align: center;

`
const H2 = styled.h2`
text-align: center;
`


const mapStateToProps = (state) => ({
  cartItems: state.data.cartItems,
  currency: state.data.currency,
  currencySymbol: state.data.currencySymbol,
});

export default connect(mapStateToProps)(Cart);
