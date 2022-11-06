import React, { Component } from "react";
import nextArrow from "../../../assets/right-arrow.svg";
import prevArrow from "../../../assets/left-arrow.svg";
import styled from "styled-components";

export default class Slider extends Component {
  state = {
    currentIndex: 0,
  };

  componentDidMount() {
    this.setState({
      currentIndex: 0,
    });
  }

  next = () => {
    if (this.state.currentIndex === this.props.images.length - 1) {
      this.setState({
        currentIndex: 0,
      });
    } else {
      this.setState({
        currentIndex: this.state.currentIndex + 1,
      });
    }
  };

  prev = () => {
    if (this.state.currentIndex === 0) {
      this.setState({
        currentIndex: this.props.images.length - 1,
      });
    } else {
      this.setState({
        currentIndex: this.state.currentIndex - 1,
      });
    }
  };

  render() {
    const { images } = this.props;
    const { currentIndex } = this.state;
    return (
      <Wrapper>
        <img src={images[currentIndex]} alt="sliderImage" />
        <span className="next__arrow" onClick={this.next}>
          <img src={nextArrow} alt="arrow" />
        </span>
        <span className="prev__arrow" onClick={this.prev}>
          <img src={prevArrow} alt="arrow" />
        </span>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  width: 200px;
  height: 288px;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .next__arrow {
    position: absolute;
    bottom: 16px;
    right: 16px;
    cursor: pointer;
  }
  .prev__arrow {
    position: absolute;
    bottom: 16px;
    right: 48px;
    cursor: pointer;
  }
`;
