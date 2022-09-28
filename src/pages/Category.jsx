import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { ProductItem } from "../components";

const Category = (props) => {
  if (!props.data.categories) {
    return null;
  }
  const filterCat = props.data?.categories?.filter(
    (item) => item.name === props.category
  );
  return (
    <>
      <P>Category name</P>
      <Wrapper>
        {filterCat[0]?.products?.map(
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
  margin: 88px 0;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 60px;
`;

const mapStateToProps = (state) => ({
  data: state.data.data,
  category: state.data.category,
});

export default connect(mapStateToProps)(Category);
