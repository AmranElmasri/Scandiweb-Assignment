import React from "react";
import styled from "styled-components";

class Attributes extends React.Component {
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
      <>
        {attribute.type === "text" && (
          <>
            <P>{attribute.name} :</P>
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
        {attribute.type === "swatch" && (
          <>
            <P>{attribute.name} :</P>
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
        )}
      </>
    );
  }
}

const P = styled.p`
  padding: 0;
  margin: 10px 0;
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
    }
  }
`;

export default Attributes;
