# react-drawer
Drawer is a panel that is  slides in from the side

## Install

```bash
$ tnpm install react-drawer-ui --save
```

## Options
- visible: default 300
- duration: default 500
- width: default 500
- zIndex: default 1000
- title: default ''
- mask: default false
- maskClosable: default true
- onCancel: default () => {}

## Example
```javascript
import React from 'react';
import Drawer from 'react-drawer-ui';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  
  handleOpen() {
    this.setState({
      visible: true
    })
  }

  handleClose() {
    this.setState({
      visible: false
    })
  }

  render() {
    return (
      <div style={{
        position: 'relative',
        width: '100%',
        height: 800
      }}>
        <a onClick={this.handleOpen}>open</a>
        <Drawer 
          visible={this.state.visible} 
          onCancel={this.handleClose}
          mask={true}
        />
      </div>
    );
  }
}

export default App;
```


