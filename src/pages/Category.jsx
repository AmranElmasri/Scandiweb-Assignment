import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { ProductItem } from "../components";

const Category = ({ categories, activeCategory, products, error }) => {
  if (categories.length === 0 || products.length === 0) return null;

  const filterCat = categories?.filter((item) => item.name === activeCategory);
  return (
    <>
      <P>{filterCat[0].name}</P>
      <Wrapper>
        {products.loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {products?.data.category.products.map(
          ({ name, gallery, inStock, prices, brand, attributes, id }) => (
            <div key={id}>
              <ProductItem
                name={name}
                gallery={gallery}
                inStock={inStock}
                prices={prices}
                brand={brand}
                attributes={attributes}
                id={id}
              />
            </div>
          )
        )}
      </Wrapper>
    </>
  );
};

const P = styled.p`
  font-size: 42px;
  font-weight: 400;
  margin: 80px 0;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 60px;
`;

const mapStateToProps = (state) => ({
  categories: state.categories.categories,
  activeCategory: state.categories.activeCategory,
  products: state.products.products,
  error: state.products.error,
});

export default connect(mapStateToProps)(Category);
