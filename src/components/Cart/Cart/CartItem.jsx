import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  setCurrencySymbol,
  setDecreaseAmount,
  setIncreaseAmount,
} from "../../../Store/Slices/dataSlice";
import CartItemAttributes from "./itemAttributes";
import rightArrow from "../../../assets/right-arrow.svg";
import leftArrow from "../../../assets/left-arrow.svg";

class CartItem extends React.Component {
  render() {
    const {
      id,
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
    } = this.props;
    const currencyFilter = prices.filter(
      (item) => item.currency.label.toLowerCase() === currency
    );
    const currencySymbol = currencyFilter[0].currency.symbol;

    setCurrencySymbol(currencySymbol);
    return (
      <>
        <hr
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "#E5E5E5",
            margin: "20px 0",
            textAlign: "center",
          }}
        />
        <Wrapper>
          <div className="cart__item__left">
            <strong>{brand}</strong>
            <p>{name}</p>
            <h3>
              {currencySymbol} {(currencyFilter[0].amount * amount).toFixed(2)}
            </h3>
            {attributes.map((attribute, index) => (
              <div key={index}>
                <CartItemAttributes attribute={attribute} />
              </div>
            ))}
          </div>
          <div className="cart__item__right">
            <div className="right__actions">
              <button onClick={() => setIncreaseAmount(id)}>+</button>
              <p>{amount}</p>
              <button
                onClick={() => setDecreaseAmount(id)}
                disabled={amount === 1}
              >
                -
              </button>
            </div>
            <div className="cart__item__img">
              <img src={gallery[0]} alt="product" />
              <span className="right__arrow">
                <img src={rightArrow} alt="arrow" />
              </span>
              <span className="left__arrow">
                <img src={leftArrow} alt="arrow" />
              </span>
            </div>
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
    .cart__item__img {
      width: 200px;
      height: 288px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      .right__arrow {
        position: absolute;
        bottom: 16px;
        right: 16px;
        background-color: #fff;
        cursor: pointer;
      }
      .left__arrow {
        position: absolute;
        bottom: 16px;
        right: 48px;
        background-color: #fff;
        cursor: pointer;
      }
    }
  }
`;

const mapStateToProps = (state) => ({
  currency: state.data.currency,
});
const mapDispatchToProps = {
  setIncreaseAmount,
  setDecreaseAmount,
  setCurrencySymbol,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
