import React, { Component } from 'react';
import styled from 'styled-components';
import Transition from 'react-transition-group/Transition';
import PropTypes from 'prop-types';
import close from './close.svg';

const Viewport = styled.div`
  position: absolute;
  width: ${props => (props.mask ? '100%' : `${props.width}px`)};
  height: 100%;
  right: ${props => props.right};
  z-index: ${props => props.zIndex || 1000};
  top: 0;
`;

const Mask = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  transition: ${props => `opacity ${props.duration}ms ease-in-out`};
  opacity: ${props => props.opacity};
`;

const Container = styled.div`
  transition: ${props => `right ${props.duration}ms ease-in-out`};
  position: absolute;
  top: 0;
  right: ${props => `${props.right}px`};
  width: ${props => `${props.width}px`};
  height: 100%;
  background-color: white;
  z-index: ${props => props.zIndex || 1000};
  border-radius: 4px 0 0 4px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
`;

const Header = styled.header.attrs({
  height: 55,
})`
  width: 100%;
  height: ${props => `${props.height}px`};
  line-height: ${props => `${props.height}px`};
  border-bottom: 1px solid rgba(235, 235, 235, 1);
  font-size: 14px;
  color: rgba(0, 0, 0, 0.647058823529412);
  box-sizing: border-box;
  font-weight: 650;
  display: flex;
`;

const HeaderContent = styled.div`
  flex-grow: 1;
  padding-left: 20px;
`;

const CloseBtn = styled.a`
  width: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Content = styled.div`
  flex-grow: 1;
  overflow: auto;
  height: 0;
  box-sizing: border-box;
  padding: 20px;
`;

export default class Drawer extends Component {
  constructor(props) {
    super(props);

    this.duration = 0;
    this.defaultStyle = {};
    this.transitionContainerRight = {};
    this.transitionViewportRight = {};
    this.transitionMaskOpacity = {
      entering: 1,
      entered: 1,
      exiting: 0,
      exited: 0,
    };
  }

  componentWillMount() {
    this.duration = this.props.duration;

    this.defaultStyle = {
      width: this.props.width,
      zIndex: this.props.zIndex,
    };

    this.transitionContainerRight = {
      entering: 0,
      entered: 0,
      exiting: -(this.defaultStyle.width),
      exited: -(this.defaultStyle.width),
    };

    this.transitionViewportRight = {
      entering: 0,
      entered: 0,
      exiting: 0,
      exited: this.props.mask ? '-100%' : `${-(this.defaultStyle.width)}px`,
    };
  }

  onCancelHandler = () => {
    this.props.onCancel();
  }

  onClose = () => {
    this.onCancelHandler();
  }

  onClickMask = () => {
    if (this.props.maskClosable) {
      this.onClose();
    }
  }

  render() {
    return (
      <Transition in={this.props.visible} timeout={this.duration}>
        {transitionState => (
          <Viewport
            right={this.transitionViewportRight[transitionState]}
            mask={this.props.mask ? 1 : 0}
            {...this.defaultStyle}
          >
            {this.props.mask && (
              <Mask
                opacity={this.transitionMaskOpacity[transitionState]}
                onClick={this.onClickMask}
                duration={this.duration}
              />
            )}

            <Container
              duration={this.duration}
              {...this.defaultStyle}
              onClick={this.onClickContainer}
              right={this.transitionContainerRight[transitionState]}
            >
              <Header>
                <HeaderContent>{this.props.title}</HeaderContent>
                <CloseBtn onClick={this.onClose}><img width={16} height={16} src={close} alt="close" /></CloseBtn>
              </Header>

              <Content>
                {this.props.children}
              </Content>
            </Container>
          </Viewport>
        )}
      </Transition>
    );
  }
}

Drawer.defaultProps = {
  visible: false,
  duration: 300,
  width: 500,
  zIndex: 1000,
  title: '',
  mask: false,
  maskClosable: true,
  onCancel: () => {},
};

Drawer.propTypes = {
  visible: PropTypes.bool,
  duration: PropTypes.number,
  width: PropTypes.number,
  zIndex: PropTypes.number,
  title: PropTypes.node,
  mask: PropTypes.bool,
  maskClosable: PropTypes.bool,
  onCancel: PropTypes.func,
};