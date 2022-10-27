import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { setActiveCategory } from "../../Store/Slices/categoriesSlice";
import { fetchProducts } from "../../Store/Slices/productsSlice";

class NavList extends Component {
  render() {
    const { categories, activeCategory } = this.props;
    return (
      <List>
        {categories.map((cat, index) => {
          return (
            <Link to={"/"} key={index}>
              <li
                className={activeCategory === cat.name ? "active" : ""}
                onClick={() => {
                  this.props.setActiveCategory(cat.name);
                  this.props.fetchProducts(cat.name);
                }}
              >
                {cat.name}
              </li>
            </Link>
          );
        })}
      </List>
    );
  }
}

const List = styled.ul`
  width: 234px;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  flex: 20%;

  li {
    padding: 10px;
    font-size: 1rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      color: #5ece7b;
    }
    &.active {
      color: #5ece7b;
      border-bottom: #5ece7b 1px solid;
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    categories: state.categories.categories,
    activeCategory: state.categories.activeCategory,
  };
};

const mapDispatchToProps = { setActiveCategory, fetchProducts };

export default connect(mapStateToProps, mapDispatchToProps)(NavList);
