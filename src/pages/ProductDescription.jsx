import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ProductItemAttributes from "../components/Cart/Cart/itemAttributes";
import parse from "html-react-parser";
import { toast } from "react-toastify";
import { setCartItems, setRemoveFromCartItem } from "../Store/Slices/dataSlice";

const ProductDescription = ({
  data,
  currency,
  cartItems,
  setCartItems,
  setRemoveFromCartItem,
}) => {
  const { id } = useParams();

  if (!data.categories) {
    return null;
  }

  const productDescription = data?.categories[0].products.find(
    (item) => item.id === id
  );

  const productBrice = productDescription.prices.find(
    (sympol) => sympol.currency.label.toLowerCase() === currency
  );

  const inStock = productDescription.inStock;
  const inCart = cartItems.find((item) => item.id === id);

  const removeFromCart = () => {
    setRemoveFromCartItem(id);
    toast.success("Item removed from cart", {
      position: "top-center",
    });
  };

  const addToCart = () => {
    if (inStock && !inCart) {
      setCartItems({
        id,
        name: productDescription.name,
        gallery: productDescription.gallery,
        inStock: productDescription.inStock,
        prices: productDescription.prices,
        brand: productDescription.brand,
        attributes: productDescription.attributes,
        amount: 1,
      });
      toast.success("Item added to cart !", {
        position: "top-center",
      });
    } else if (inCart) {
      toast.warn("Item already in cart", {
        position: "top-center",
      });
    } else {
      toast.error("Item out of stock", {
        position: "top-center",
      });
    }
  };

  return (
    <Wrapper>
      <div className="gallery">
        {productDescription.gallery.map((item, index) => (
          <div className="img__gallery" key={index}>
            <img src={item} alt="img" />
          </div>
        ))}
      </div>
      <div className="main__content">
        <div className="main__img">
          <img src={productDescription.gallery[0]} alt="product" />
        </div>
        <div className="product__info">
          <strong>{productDescription.brand}</strong>
          <p>{productDescription.name}</p>
          <div className="product__attribute">
            {productDescription.attributes.map((attribute) => (
              <ProductItemAttributes attribute={attribute} />
            ))}
          </div>
          <div className="product__price">
            <div className="price">PRICE:</div>
            <span>{productBrice.currency.symbol}</span>
            <span>{productBrice.amount}</span>
          </div>
          <div className="add__to__cart">
            {inCart ? (
              <button onClick={removeFromCart} className="remove__btn">
                Remove from cart
              </button>
            ) : (
              <button onClick={addToCart}>Add to cart</button>
            )}
          </div>
          <div className="product__description">
            {parse(productDescription.description)}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 80px;
  .gallery {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    flex: 10%;
    .img__gallery {
      width: 79px;
      height: 80px;
      margin-bottom: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .main__content {
    display: flex;
    flex: 90%;
    justify-content: space-between;
    gap: 4rem;
    .main__img {
      flex: 45%;
      width: 610px;
      height: 511px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .product__info {
      flex: 45%;
      display: flex;
      flex-direction: column;
      justify-content: start;
      align-items: flex-start;
      strong {
        font-size: 2rem;
        font-weight: 600;
        margin-bottom: 1rem;
      }
      p {
        font-size: 2rem;
        font-weight: 400;
        margin-bottom: 1rem;
        text-align: right;
      }
      .product__description {
        margin: 40px 0;
        font-weight: 400;
        font-size: 16px;
        p {
          font-size: 16px;
          text-align: justify;
        }
      }
      .product__price {
        font-size: 2rem;
        margin: 2rem 0;
        text-align: right;
        font-weight: 700;
        .price {
          font-size: 18px;
          font-weight: 700;
          display: flex;
          justify-content: flex-start;
        }
        span {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 1rem;
          text-align: right;
        }
      }
      .add__to__cart {
        button,
        .remove__btn {
          background: #5ece7b;
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
          text-transform: uppercase;
        }
        .remove__btn {
          background: #da4a4a;
        }
      }
    }
  }
`;

const mapStateToProps = (state) => ({
  data: state.data.data,
  currency: state.data.currency,
  cartItems: state.data.cartItems,
});

const mapDispatchToProps = { setCartItems, setRemoveFromCartItem };

export default connect(mapStateToProps, mapDispatchToProps)(ProductDescription);
