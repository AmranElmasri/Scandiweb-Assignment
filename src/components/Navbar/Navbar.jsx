import React, { Component } from "react";
import "./style.css";
import middleLogo from "../../assets/a-logo.svg";
import vector from "../../assets/Vector.svg";
import { connect } from "react-redux";
import usd from "../../assets/usd.svg";
import gbp from "../../assets/gbp.svg";
import jpy from "../../assets/jpy.svg";
import upVector from "../../assets/upVector.svg";
import { setCategory, setCurrency } from "../../Store/Slices/dataSlice";
import { CartModal } from "..";
import { Link } from "react-router-dom";

class Navbar extends Component {
  state = {
    open: false,
    openCart: false,
  };


  setActive = (cat) => {
    this.props.setCategory(cat);
  };


  setOpenCart = (open) => {
    this.setState({ openCart: open });
  };
    
  menuRef = React.createRef();

  handleClickOutside() {
      this.setState({ open: false });
  }

  handleClickOutside = this.handleClickOutside.bind(this);

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  render() {
    const { currency, category, data } = this.props;
    const {openCart} = this.state;
    if (!data.categories) {
      return null;
    }
    const { prices } = data.categories[0].products[0];
    return (
      <nav className="navbar">
        <div className="nav-cat">
          <div
            onClick={() => this.setActive("all")}
            className={
              category === "all" ? "all-cat active" : "all-cat"
            }
          >
            All
            <div />
          </div>
          <div
            onClick={() => this.setActive("clothes")}
            className={
              category === "clothes"
                ? "clothes-cat active"
                : "clothes-cat"
            }
          >
            Clothes
            <div />
          </div>
          <div
            onClick={() => this.setActive("tech")}
            className={
              category === "tech" ? "tech-cat active" : "tech-cat"
            }
          >
            Tech
            <div />
          </div>
        </div>
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
                this.setState({ ...this.state, open: !this.state.open });
              }}
            >
              {currency === "usd" && (
                <div>
                  <span>
                  &#36;
                  </span>
                  <span>
                    <img
                      src={this.state.open ? upVector : vector}
                      alt="vector"
                      style={{ marginLeft: "8px" }}
                    />
                  </span>
                </div>
              )}
              {currency === "gbp" && (
                <div>
                  &#163;
                  <span>
                    <img
                      src={this.state.open ? upVector : vector}
                      alt="vector"
                      style={{ marginLeft: "8px" }}
                    />
                  </span>
                </div>
              )}
              {currency === "aud" && (
                <div>
                  A$
                  <span>
                    <img
                      src={this.state.open ? upVector : vector}
                      alt="vector"
                      style={{ marginLeft: "8px" }}
                    />
                  </span>
                </div>
              )}
              {currency === "jpy" && (
                <div>
                  &#165;
                  <span>
                    <img
                      src={this.state.open ? upVector : vector}
                      alt="vector"
                      style={{ marginLeft: "8px" }}
                    />
                  </span>
                </div>
              )}
              {currency === "rub" && (
                <div>
                  ₽
                  <span>
                    <img
                      src={this.state.open ? upVector : vector}
                      alt="vector"
                      style={{ marginLeft: "8px" }}
                    />
                  </span>
                </div>
              )}
            </div>

            <div
              className={`dropdown-menu ${
                this.state.open ? "active" : "inactive"
              }`}
            >
              <ul>
                {prices.map(({currency: {label, symbol}}, index) => (
                  <li key={index} className={`dropdownItem ${currency === label.toLowerCase() ? "active" : ""} `} onClick={() => this.props.setCurrency(label.toLowerCase())}>
                    <DropdownItem label={label} symbol={symbol} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        <CartModal openCart={openCart} setOpenCart={this.setOpenCart}/>
        </div>
      </nav>
    );
  }
}

function DropdownItem({ label, symbol }) {
  return <>
   <span className="dropDown-span">{symbol}</span> {" "}
   <span className="dropDown-span">{label}</span>
  </>
}

const mapStateToProps = (state) => ({
  data: state.data.data,
  category: state.data.category,
  currency: state.data.currency,
});

const mapDispatchToProps = { setCategory, setCurrency };

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);