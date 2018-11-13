import React, { Component } from 'react';
import Transition from 'react-transition-group/Transition';
import PropTypes from 'prop-types';
import close from './close.svg';

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
    const { mask, zIndex, width, duration } = this.props;
    return (
      <Transition in={this.props.visible} timeout={this.duration}>
        {transitionState => (
          <div 
            style={{
              position: 'absolute',
              width: mask ? '100%' : width,
              height: '100%',
              right: this.transitionViewportRight[transitionState],
              zIndex: zIndex || 1000,
              top: 0,
            }}
          >
            {this.props.mask && (
              <div
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  top: 0,
                  left: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  transition: `opacity ${duration}ms ease-in-out`,
                  opacity: this.transitionMaskOpacity[transitionState]
                }}
                onClick={this.onClickMask}
              />
            )}

            <div
              onClick={this.onClickContainer}
              style={{
                transition: `right ${duration}ms ease-in-out`,
                position: 'absolute',
                top: 0,
                right: this.transitionContainerRight[transitionState],
                width: width,
                height: '100%',
                backgroundColor: 'white',
                zIndex: zIndex || 1000,
                borderRadius: '4px 0 0 4px',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)'
              }}
            >
              <div style={{
                width: '100%',
                height: 55,
                lineHeight: 55,
                borderBottom: '1px solid rgba(235, 235, 235, 1)',
                fontSize: 14,
                color: 'rgba(0, 0, 0, 0.647058823529412)',
                boxSizing: 'border-box',
                fontWeight: 650,
                display: 'flex'
              }}>
                <div style={{
                  flexGrow: 1,
                  paddingLeft: 20
                }}>{this.props.title}</div>
                <span style={{
                    width: 55,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }} 
                  onClick={this.onClose}><img width={16} height={16} src={close} alt="close" /></span>
              </div>

              <div style={{
                flexGrow: 1,
                overflow: 'auto',
                height: 0,
                boxSizing: 'border-box',
                padding: 20
              }}>
                {this.props.children}
              </div>
            </div>
          </div>
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