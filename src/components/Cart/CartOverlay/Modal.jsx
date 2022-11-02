import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import cartIcon from "../../../assets/cart.svg";
import ModalItem from "./ModalItem";

class Modal extends Component {
  render() {
    const { openCart, setOpenCart, cartItems, currency, currencySymbol } = this.props;
    const subTotal = cartItems.reduce(
      (acc, c) => acc + c.amount * c.prices.filter(item => item.currency.label.toLowerCase() === currency)[0].amount,
    0);

    return (
      <>
        <Wrapper onClick={() => setOpenCart(!openCart)}>
          <img src={cartIcon} alt="cartIcon" className="cart__icon" />
          {cartItems.length > 0 && (
            <span className="cart__badge">{cartItems.length}</span>
          )}
        </Wrapper>
        {openCart && (
          <Modall onClick={() => setOpenCart(false)}>
            <div className="contents" onClick={(e) => e.stopPropagation()}>
              <div>
                <strong>My Bag, </strong>
                {cartItems.length} items
              </div>
              {cartItems.length > 0 ? (
                cartItems.map(
                  ({
                    id,
                    name,
                    gallery,
                    inStock,
                    prices,
                    brand,
                    attributes,
                    amount,
                  }) => (
                    <div key={id}>
                      <ModalItem
                        id={id}
                        name={name}
                        gallery={gallery}
                        inStock={inStock}
                        prices={prices}
                        brand={brand}
                        attributes={attributes}
                        amount={amount}
                      />
                    </div>
                  )
                )
              ) : (
                <h3 style={{textAlign: "center"}}>Cart is empty</h3>
              )}
              <div className="total">
                <strong>Total</strong>
                <strong>{currencySymbol}{subTotal.toFixed(2)}</strong>
              </div>
              <div className="btns__action">
                <Link to={"/cart"}>
                  <button onClick={() => setOpenCart(false)}>
                    <p>view bag</p>
                  </button>
                </Link>
                <button>
                  <p>check out</p>
                </button>
              </div>
            </div>
          </Modall>
        )}
      </>
    );
  }
}

const Wrapper = styled.div`
  position: relative;
  width: 25px;
  height: 25px;
  cursor: pointer;
  .cart__icon {
    width: 100%;
    height: 100%;
  }
  .cart__badge {
    position: absolute;
    top: -8px;
    right: -10px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #000;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: bold;
    font-family: Arial, Helvetica, sans-serif;
  }
`;

const Modall = styled.div`
  position: absolute;
  left: 0;
  top: 78px;
  width: 100vw;
  height: 110vw;
  background: rgba(57, 55, 72, 0.22);
  z-index: 100;
  .contents {
    width: 293px;
    height: 538px;
    background: #fff;
    right: 8%;
    position: absolute;
    padding: 2rem 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: auto;
    .item__content {
      width: 100%;
      display: flex;
      align-items: center;
      padding-top: 0.5rem;
      margin-bottom: 2rem;
    }
    .left__contect {
      flex: 50%;
      height: 100%;
      h4 {
        margin: 1rem 0;
      }
    }
    .rigth__content {
      flex: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
      .action__content {
        flex: 10%;
        height: 190px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        button {
          width: 24px;
          height: 24px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: transparent;
          color: #000;
          font-size: 1.5rem;
          cursor: pointer;
        }
      }
      .img__content {
        flex: 40%;
        width: 121px;
        height: 190px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .text {
      padding: 0.3rem 0.2rem;
      border: 1px solid #000;
      margin: 0 0.2rem;
      margin-top: 0.5rem;
      width: 20px;
      height: 20px;
      font-family: "Source Sans Pro", sans-serif;
      font-size: 14px;
      font-weight: 400;
      border: #1d1f22 1px solid;
      &.active {
        color: #fff;
        background-color: #000;
      }
    }
    .total {
      width: 100;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 0;
      margin: 1rem 0;
    }
    .btns__action {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      button {
        width: 130px;
        height: 43px;
        border: none;
        color: #fff;
        font-size: 14px;
        font-weight: 500;
        padding: 1rem 2rem;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        text-transform: uppercase;
        &:first-child {
          background-color: #fff;
          color: #000;
          border: 1px solid #1d1f22;
        }
        &:nth-child(2) {
          background-color: #5ece7b;
        }
        p {
          clear: both;
          display: inline-block;
          white-space: nowrap;
        }
      }
    }
  }
  @media (min-width: 1440px) {
    .contents {
      right: 12%;
    }
  }
`;

const mapStateToProps = (state) => ({
  cartItems: state.data.cartItems,
  currency: state.data.currency,
  currencySymbol: state.data.currencySymbol,
});

export default connect(mapStateToProps)(Modal);
