import React, { Component } from "react";
import "./style.css";
import middleLogo from "../../assets/a-logo.svg";
import vector from "../../assets/Vector.svg";
import { connect } from "react-redux";
import upVector from "../../assets/upVector.svg";
import { setCurrency, setSwitcherOpen, setCartOpen } from "../../Store/Slices/dataSlice";
import { CartModal } from "..";
import { Link } from "react-router-dom";
import NavList from "../NavList/NavList";

class Navbar extends Component {

  setActive = (cat) => {
    this.props.setCategory(cat);
  };

  setOpenCart = (open) => {
    this.props.setCartOpen(open);
  };

  menuRef = React.createRef();

  handleClickOutside() {
    this.props.setSwitcherOpen(false);
  }

  handleClickOutsidee = this.handleClickOutside.bind(this);

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutsidee);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutsidee);
  }

  render() {
    const currencies = [
      {
        label: "USD",
        symbol: "$",
      },
      {
        label: "GBP",
        symbol: "£",
      },
      {
        label: "AUD",
        symbol: "A$",
      },
      {
        label: "JPY",
        symbol: "¥",
      },
      {
        label: "RUB",
        symbol: "₽",
      },
    ];
    const { currency } = this.props;
    return (
      <nav className="navbar">

        <NavList />
        <div className="nav-logo">
          <Link to={"/"}>
            <img src={middleLogo} alt="logo" />
          </Link>
        </div>
        <div className="nav-tools">
          <div className="menu-container" ref={this.menuRef}>
            <div
              className="menu-trigger"
              onClick={() => {
                if(this.props.cartOpen){
                  this.setOpenCart(false);
                }
                this.props.setSwitcherOpen(!this.props.switcherOpen);
              }}
            >
              {currency === "usd" && (
                <div>
                  <span>&#36;</span>
                  <span>
                    <img
                      src={this.props.switcherOpen ? upVector : vector}
                      alt="vector"
                    />
                  </span>
                </div>
              )}
              {currency === "gbp" && (
                <div>
                  &#163;
                  <span>
                    <img
                      src={this.props.switcherOpen ? upVector : vector}
                      alt="vector"
                    />
                  </span>
                </div>
              )}
              {currency === "aud" && (
                <div>
                  A$
                  <span>
                    <img
                      src={this.props.switcherOpen ? upVector : vector}
                      alt="vector"
                    />
                  </span>
                </div>
              )}
              {currency === "jpy" && (
                <div>
                  &#165;
                  <span>
                    <img
                      src={this.props.switcherOpen ? upVector : vector}
                      alt="vector"
                    />
                  </span>
                </div>
              )}
              {currency === "rub" && (
                <div>
                  ₽
                  <span>
                    <img
                      src={this.props.switcherOpen ? upVector : vector}
                      alt="vector"
                    />
                  </span>
                </div>
              )}
            </div>

            <div
              className={`dropdown-menu ${
                this.props.switcherOpen ? "active" : "inactive"
              }`}
            >
              <ul>
                {currencies.map(({ label, symbol }, index) => (
                  <li
                    key={index}
                    className={`dropdownItem ${
                      currency === label.toLowerCase() ? "active" : ""
                    } `}
                    onClick={() => this.props.setCurrency(label.toLowerCase())}
                  >
                    <DropdownItem label={label} symbol={symbol} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <CartModal setOpenCart={this.setOpenCart} />
        </div>
      </nav>
    );
  }
}

function DropdownItem({ label, symbol }) {
  return (
    <>
      <span className="dropDown-span">{symbol}</span>{" "}
      <span className="dropDown-span">{label}</span>
    </>
  );
}

const mapStateToProps = (state) => ({
  data: state.data.data,
  categories: state.categories.categories,
  currency: state.data.currency,
  switcherOpen: state.data.switcherOpen,
  cartOpen: state.data.cartOpen,
});

const mapDispatchToProps = { setCurrency, setSwitcherOpen, setCartOpen };

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
