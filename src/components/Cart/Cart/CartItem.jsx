import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  setCurrencySymbol,
  setDecreaseAmount,
  setIncreaseAmount,
  setRemoveFromCartItem,
} from "../../../Store/Slices/dataSlice";
import CartItemAttributes from "./ItemAttributes";
import { toast } from "react-toastify";
import Slider from "./Slider";

class CartItem extends React.Component {
  removeFromCart = (key) => {
    this.props.setRemoveFromCartItem(key);
    toast.success("Item removed from cart", {
      position: "top-center",
    });
  }
  render() {
    const {
      name,
      gallery,
      prices,
      brand,
      attributes,
      amount,
      currency,
      setIncreaseAmount,
      setDecreaseAmount,
      setCurrencySymbol,
      keyy,
    } = this.props;
    const currencyFilter = prices.filter(
      (item) => item.currency.label.toLowerCase() === currency
    );
    const currencySymbol = currencyFilter[0].currency.symbol;

    setCurrencySymbol(currencySymbol);
    return (
      <>
        <Hr />
        <Wrapper>
          <div className="cart__item__left">
            <strong>{brand}</strong>
            <p>{name}</p>
            <h3>
              {currencySymbol} {currencyFilter[0].amount.toFixed(2)}
            </h3>
            {attributes.map((attribute, index) => (
              <div key={index}>
                <CartItemAttributes attribute={attribute} />
              </div>
            ))}
          </div>
          <div className="cart__item__right">
            <div className="right__actions">
              <button onClick={() => setIncreaseAmount(keyy)}>+</button>
              <p>{amount}</p>
              <button
                onClick={amount === 1 ? () => this.removeFromCart(keyy):() => setDecreaseAmount(keyy)}
              >
                -
              </button>
            </div>
              <Slider images={gallery} />
          </div>
        </Wrapper>
      </>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  .cart__item__left {
    flex: 70%;
    strong {
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }
    p {
      font-size: 2rem;
      font-weight: 400;
      margin-bottom: 1rem;
    }
    h3 {
      margin-bottom: 1rem;
      font-size: 24px;
    }
  }
  .cart__item__right {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 20%;
    height: 288px;
    .right__actions {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      button {
        width: 45px;
        height: 45px;
        box-sizing: border-box;
        font-size: 1.8rem;
        background-color: #fff;
        color: #000;
        cursor: pointer;
      }
      p {
        font-size: 24px;
        font-weight: 500;
      }
    }
  }
`;
const Hr = styled.hr`
  width: 100%;
  height: 1px;
  background-color: #e5e5e5;
  margin: 20px 0;
  text-align: center;
`;

const mapStateToProps = (state) => ({
  currency: state.data.currency,
});
const mapDispatchToProps = {
  setIncreaseAmount,
  setDecreaseAmount,
  setCurrencySymbol,
  setRemoveFromCartItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
