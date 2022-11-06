import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import ProductAttributes from "../components/Product/ProductAttributes";
import parse from "html-react-parser";
import { toast } from "react-toastify";
import { setCartItems, setRemoveFromCartItem, setIncreaseAmount } from "../Store/Slices/dataSlice";
import { fetchProduct } from "../Store/Slices/productSlice";
import { motion } from "framer-motion";

class ProductDescription extends React.Component {
  constructor(props){
    super(props);
    this.carousel = React.createRef();

    this.state = {
      image: "",
      selectedAttributes: [],
    };
    
  }
  

  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.id);
  }


  setAttribute = (attribute, selectedItem) => {
    if (
      this.state.selectedAttributes.find((item) => item.id === attribute.id)
    ) {
      this.setState({
        selectedAttributes: this.state.selectedAttributes.map((item) => {
          if (item.id === attribute.id) return { ...attribute, selectedItem };
          return item;
        }),
      });
    } else {
      this.setState({
        selectedAttributes: [
          ...this.state.selectedAttributes,
          { ...attribute, selectedItem },
        ],
      });
    }
  };

  productBrice() {
    return this.props.product?.data?.product.prices.find(
      (item) => item.currency.label.toLowerCase() === this.props.currency
    );
  }

  inCart = () => this.props.cartItems.find(
    (item) => item.id === this.props.product?.data?.product.id
  );

  findItemWithSelectedAttributes = () => {
    const { selectedAttributes } = this.state;
    const { cartItems } = this.props;
    let product = null;
    for(let i =0; i < selectedAttributes.length; i++){
      product = cartItems.find((item) =>
        item.attributes.find(attribute => attribute.selectedItem === selectedAttributes[i].selectedItem)
      )
      if(!product) return false;
    }
    return product;
  };

  // inCartWithSpecificAttribute = () => {
  //   let bool = false;
  //   this.findItemWithSelectedAttributes()?.attributes?.forEach(attribute => {
  //     if(attribute.selectedItem && this.state.selectedAttributes.findIndex(item => item.selectedItem === attribute.selectedItem) !== -1){
  //       bool = true;
  //     }
  //   }); 
  //   return bool;
  // } 

  inCartWithDefaultAttribute = () => {
    let product = null;
    const { cartItems } = this.props;
    cartItems?.forEach(item => {
      if(item.id === this.props.product?.data?.product.id){
        item.attributes.forEach(attribute => {
          if(!attribute.hasOwnProperty("selectedItem")){
            product = item;
          }
        })
      }
    })
    return product;
  }

  inStock() {
    if (this.props.product?.data?.product.inStock) {
      return true;
    }
    return false;
  }

  removeFromCart = () => {
    this.props.setRemoveFromCartItem(this.props.product?.data?.product.id);
    toast.success("Item removed from cart", {
      position: "top-center",
    });
  };
  
  
  addToCart = () => {
    if (this.inStock() && this.inCart() && !!this.findItemWithSelectedAttributes()) {
      this.props.setIncreaseAmount(this.findItemWithSelectedAttributes()?.key);
      toast.success("Item updated !", {
        position: "top-center",
      });
      this.setState({selectedAttributes: []});
      return;
    } else if (this.inStock() && this.inCart() && !!this.inCartWithDefaultAttribute() && this.state.selectedAttributes.length === 0) {
      this.props.setIncreaseAmount(this.inCartWithDefaultAttribute()?.key);
      toast.success("Item updated !", {
        position: "top-center",
      });
      this.setState({selectedAttributes: []});
      return;
    } else if (this.inStock()) {
      this.props.setCartItems({
        id: this.props.product?.data?.product.id,
        name: this.props.product?.data?.product.name,
        gallery: this.props.product?.data?.product.gallery,
        inStock: this.props.product?.data?.product.inStock,
        prices: this.props.product?.data?.product.prices,
        brand: this.props.product?.data?.product.brand,
        attributes:
          this.state.selectedAttributes.length > 0
            ? this.state.selectedAttributes
            : this.props.product?.data?.product.attributes,
        amount: 1,
        key: Date.now(),
      });
      toast.success("Item added to cart !", {
        position: "top-center",
      });
      this.setState({selectedAttributes: []});
      return;
    } else {
      toast.error("Item out of stock", {
        position: "top-center",
      });
    }
  };

  render() {
    const { isLoading, error } = this.props;
    if (this.props.product.length === 0) return null;
    const productDescription = this.props.product?.data?.product;
    return (
      <Wrapper>
        {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        <motion.div className="gallery carousel" ref={this.carousel} whileTap={{cursor: "grabbing"}}>
          <motion.div className="inner__carousel" drag="y" dragConstraints={{ bottom: 0, top: -119 }}>
            {productDescription.gallery.map((image) => (
              <motion.div
                className="img__gallery"
                key={image}
                onClick={() => this.setState({ image: image })}
              >
                <img src={image} alt="img" className={this.state.image === image ? "active__image": ""}/>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        <div className="main__content">
          <div className="main__img">
            {!this.state.image ? (
              <img src={productDescription.gallery[0]} alt="main default" />
            ) : (
              <img src={this.state.image} alt="main" />
            )}
          </div>
          <div className="product__info">
            <strong>{productDescription.brand}</strong>
            <p>{productDescription.name}</p>
            <div className="product__attribute">
              {productDescription.attributes.map((attribute) => (
                <div key={attribute.id}>
                  <ProductAttributes
                    attribute={attribute}
                    setAttribute={this.setAttribute}
                    selectedAttributes={this.state.selectedAttributes}
                  />
                </div>
              ))}
            </div>
            <div className="product__price">
              <div className="price">PRICE:</div>
              <span>{this.productBrice()?.currency.symbol}</span>
              <span>{this.productBrice()?.amount}</span>
            </div>
            <div className="add__to__cart">
              <button onClick={this.addToCart}>Add to cart</button>
            </div>
            <div className="product__description">
              {parse(productDescription.description)}
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}

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
    height: 511px;
    overflow: hidden;
    cursor: grab;
    margin-left: -40px;
    .inner__carousel {
      /* height: 100%; */
      .img__gallery {
        width: 79px;
        height: 80px;
        margin-bottom: 10px;
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          pointer-events: none;
          &.active__image {
            border: 1px solid #5ece7b;
            transform: scale(1.1);
            transition: all 0.3s;
          }
        }
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
        object-fit: contain;
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
        button {
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
          transition: all 0.3s;
          &:hover {
            background: #4dbb6f;
          }
        }

      }
    }
  }
`;

const mapStateToProps = (state) => ({
  cartItems: state.data.cartItems,
  product: state.product.product,
  currency: state.data.currency,
  isLoading: state.data.isLoading,
  error: state.data.error,
});

const mapDispatchToProps = {
  setCartItems,
  setRemoveFromCartItem,
  fetchProduct,
  setIncreaseAmount,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDescription);
