import React from "react";
import styled from "styled-components";

class Attributes extends React.Component {
  state = {
    activeText: { id: this.props.attribute.items[0].id, active: true },
    activeSwatch: { id: this.props.attribute.items[0].id, active: true },
  };

  setTextActive = (id) => {
    this.setState({ activeText: { id, active: true } });
  };
  setSwatchActive = (id) => {
    this.setState({ activeSwatch: { id, active: true } });
  };

  render() {
    const { attribute } = this.props;
    return (
      <>
        {attribute.type === "text" && (
          <>
            <p style={{ padding: "0", margin: "10px 0" }}>{attribute.name} :</p>
            {attribute.items.map((item) => (
              <span
                className={
                  this.state.activeText.id === item.id &&
                  this.state.activeText.active
                    ? "text active"
                    : "text"
                }
                onClick={() => this.setTextActive(item.id)}
                key={item.id}
              >
                {item.displayValue}
              </span>
            ))}
          </>
        )}
        {attribute.type === "swatch" && (
          <>
            <p style={{ padding: "0", margin: "10px 0 0" }}>
              {attribute.name} :
            </p>
            <Swatch>
              {attribute.items.map((item) => (
                <div
                  className={
                    this.state.activeSwatch.id === item.id &&
                    this.state.activeSwatch.active
                      ? "swatch active"
                      : "swatch"
                  }
                  style={{ backgroundColor: item.value }}
                  onClick={() => this.setSwatchActive(item.id)}
                  key={item.id}
                ></div>
              ))}
            </Swatch>
          </>
        )}
      </>
    );
  }
}

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
    }
  }
`;

export default Attributes;
