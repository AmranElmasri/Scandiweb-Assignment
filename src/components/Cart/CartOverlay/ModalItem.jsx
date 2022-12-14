import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import {
  setIncreaseAmount,
  setDecreaseAmount,
  setCurrencySymbol,
  setRemoveFromCartItem,
} from "../../../Store/Slices/dataSlice";
import Attributes from "./Attributes";

class ModalItem extends React.Component {
   currencyFilter = this.props.prices.filter(
    (item) => item.currency.label.toLowerCase() === this.props.currency
  );
   currencySymbol = this.currencyFilter[0].currency.symbol;



  s = this.props.setCurrencySymbol(this.currencySymbol);

   removeFromCart = (key) => {
    this.props.setRemoveFromCartItem(key);
    toast.success("Item removed from cart", {
      position: "top-center",
    });
  }
  render() {
    const { name, gallery, brand, attributes, amount, setIncreaseAmount, setDecreaseAmount, keyy }
  = this.props;
  return (
      <div className="item__content">
        <div className="left__contect">
          <p>
            {brand} <br /> {name}
          </p>
          <h4> {this.currencySymbol}{(this.currencyFilter[0].amount).toFixed(2)}</h4>
          {attributes.map((attribute, index) => (
            <div key={index}>
              <Attributes attribute={attribute} />
            </div>
          ))}
        </div>
        <div className="rigth__content">
        <div className="action__content">
          <button onClick={() => setIncreaseAmount(keyy)}>+</button>
          <p>{amount}</p>
          <button onClick={amount === 1 ? () => this.removeFromCart(keyy):() => setDecreaseAmount(keyy)}>-</button>
        </div>
        <div className="img__content">
          <img src={gallery[0]} alt="product" />
        </div>
        </div>
      </div>
  );
} 
};

const mapStateToProps = (state) => ({
  currency: state.data.currency,
});

const mapDispatchToProps = {
  setIncreaseAmount,
  setDecreaseAmount,
  setCurrencySymbol,
  setRemoveFromCartItem
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalItem);
