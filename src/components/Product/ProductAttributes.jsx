import React from "react";
import styled from "styled-components";

class ProductAttributes extends React.Component {
  state = {
    activeText: { id: null },
    activeSwatch: { id: null },
  };

  setTextActive = (id) => {
    this.setState({ activeText: { id } });
  };
  setSwatchActive = (id) => {
    this.setState({ activeSwatch: { id } });
  };

  render() {
    const { attribute, selectedAttributes } = this.props;
    return (
      <Wrapper>
        {attribute.type === "swatch" ? (
          <>
            <div className="att__name">{attribute.name}:</div>
            <Swatch>
              {attribute.items.map((item) => (
                <div
                  className={
                    this.state.activeSwatch.id === item.id &&
                    !!selectedAttributes.find(
                      (att) => att.selectedItem === item.id && att.id === attribute.id
                    )
                      ? "swatch active"
                      : "swatch"
                  }
                  style={{ backgroundColor: item.value }}
                  onClick={() => {
                    this.setSwatchActive(item.id);
                    this.props.setAttribute(attribute, item.id);
                  }}
                  key={item.id}
                ></div>
              ))}
            </Swatch>
          </>
        ) : (
          <>
            <div className="att__name">{attribute.name}:</div>
            {attribute.items.map((item) => (
              <span
                className={
                  this.state.activeText.id === item.id &&
                  !!selectedAttributes.find(
                    (att) => att.selectedItem === item.id && att.id === attribute.id
                  )
                    ? "text active"
                    : "text"
                }
                onClick={() => {
                  this.setTextActive(item.id);
                  this.props.setAttribute(attribute, `${item.id}`);
                }}
                key={item.id}
              >
                {item.value}
              </span>
            ))}
          </>
        )}
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  .att__name {
    font-weight: 700;
    font-family: "Roboto", sans-serif;
    font-size: 18px;
    margin: 1rem 0;
    text-transform: uppercase;
  }
  .text {
    width: 63px;
    height: 45px;
    background: #ffffff;
    border: 1px solid #1d1f22;
    padding: 0.5rem 1rem;
    margin-right: 8px;
    cursor: pointer;
    &.active {
      background: #1d1f22;
      color: #ffffff;
    }
  }
`;

const Swatch = styled.div`
  width: 116px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 0;
  .swatch {
    width: 32px;
    height: 16px;
    cursor: pointer;
    border: 1px solid gray;
    &.active {
      border: 2px solid #5ece7b;
      transform: scale(1.1);
    }
  }
`;

export default ProductAttributes;
