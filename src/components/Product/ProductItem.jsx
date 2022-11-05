import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import whiteCartIcon from "../../assets/white-cart-badge.svg";
import { setCartItems, setIncreaseAmount } from "../../Store/Slices/dataSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

class ProductItem extends React.Component {
  inCart = () => this.props.cartItems.find((item) => item.name === this.props.name);

  getItemKeyById = () => this.props.cartItems.find(item => item.id === this.props.id)?.key;


  addToCart = () => {
    if (this.props.inStock && !this.inCart()) {
      this.props.setCartItems({
        id: this.props.id,
        name: this.props.name,
        gallery: this.props.gallery,
        inStock: this.props.inStock,
        prices: this.props.prices,
        brand: this.props.brand,
        attributes: this.props.attributes,
        amount: 1,
        key: Date.now(),
      });
      toast.success("Item added to cart !", {
        position: "top-center",
      });
    } else if (this.props.inStock && this.inCart()) {
      this.props.setIncreaseAmount(this.getItemKeyById());
      toast.success("Item updated !", {
        position: "top-center",
      });
    } else {
      toast.error("Item out of stock", {
        position: "top-center",
      });
    }
  };
  render() {
    const currencyFilter = this.props.prices.filter(
      (item) => item.currency.label.toLowerCase() === this.props.currency
    );
    const { id, name, gallery, inStock, brand } = this.props;
    return (
      <Wrapper>
        <Link to={`/product/${id}`} className="product__link">
          <div className="product__content">
            <div className="product__img" to={`/product/${id}`}>
              <img src={gallery[0]} alt="img" />
              {!inStock && <div className="product__out">OUT OF STOCK</div>}
            </div>
            <div className="product__name">
              {brand} {name}
            </div>
            <div className="price__text">
              {currencyFilter[0].currency.symbol}
              {currencyFilter[0].amount}
            </div>
          </div>
        </Link>
        <div className="cart__badge" onClick={this.addToCart}>
          <img src={whiteCartIcon} alt="cart-icon" />
        </div>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  width: 386px;
  height: 444px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-in-out;
  .product__link {
    position: relative;
  }
  .product__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 354px;
    height: 400px;
    .product__img {
      width: 356px;
      height: 330px;
      position: relative;
      cursor: auto;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      .product__out {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-weight: 400;
        font-size: 24px;
        color: #8d8f9a;
      }
    }
    .product__name {
      font-size: 18px;
      line-height: 28.8px;
      font-weight: 300;
      display: flex;
      align-items: center;
      width: 100%;
    }
    .price__text {
      font-size: 18px;
      line-height: 28.8px;
      font-weight: 500;
      width: 90%;
    }
  }
  .cart__badge {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background-color: #5ece7b;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 60%;
    right: 15%;
    opacity: 0;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }
  &:hover {
    box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
    .cart__badge {
      opacity: 1;
      z-index: 999;
    }
  }
`;

const mapStateToProps = (state) => ({
  currency: state.data.currency,
  cartItems: state.data.cartItems,
});

const mapDispatchToProps = { setCartItems, setIncreaseAmount };

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);
