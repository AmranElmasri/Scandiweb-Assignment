import React from "react";
import styled from "styled-components";

class itemAttributes extends React.Component {
  state = {
    activeText: { id: null, active: true },
    activeSwatch: { id: null, active: true },
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
      <Wrapper>
        {attribute.type === "swatch" ? (
          <>
            <div className="att__name">{attribute.name}:</div>
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
                  onClick={() => {
                    this.setSwatchActive(item.id);
                    this.props.setAttribute({swatch: item.value});
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
                  this.state.activeText.active
                    ? "text active"
                    : "text"
                }
                onClick={() => {
                  this.setTextActive(item.id);
                  this.props.setAttribute({text: item.value});
                }}
                key={item.id}
              >
                {item.displayValue}
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
    }
  }
`;

export default itemAttributes;
