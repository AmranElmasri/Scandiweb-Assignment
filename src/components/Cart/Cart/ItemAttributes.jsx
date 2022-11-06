import React from "react";
import styled from "styled-components";

class ItemAttributes extends React.Component {
  state = {
    activeText: { id: this.props.attribute.items[0].id },
    activeSwatch: { id: this.props.attribute.items[0].id },
  };

  setTextActive = (id) => {
    this.setState({ activeText: { id } });
  };
  setSwatchActive = (id) => {
    this.setState({ activeSwatch: { id } });
  };

  componentDidMount() {
    const { attribute } = this.props;
    if (!!attribute.selectedItem && attribute.type === "text") {
      this.setState({ activeText: { id: attribute.selectedItem } });
    }
    if (!!attribute.selectedItem && attribute.type === "swatch") {
      this.setState({ activeSwatch: { id: attribute.selectedItem } });
    }
  }

  render() {
    const { attribute } = this.props;
    return (
      <Wrapper>
        {attribute.type === "swatch" ? (
          <>
            <div className="att__name">{attribute.name}:</div>
            <Swatch>
              {attribute.items.map((item) => (
                <div
                  className={
                    this.state.activeSwatch.id === item.id
                      ? "swatch active"
                      : "swatch"
                  }
                  style={{ backgroundColor: item.value }}
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
                  this.state.activeText.id === item.id ? "text active" : "text"
                }
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
    border: 1px solid gray;
    &.active {
      border: 2px solid #5ece7b;
      transform: scale(1.1);
    }
  }
`;

export default ItemAttributes;
