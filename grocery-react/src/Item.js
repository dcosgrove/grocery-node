import React, { Component } from 'react';
import './App.css';

class Item extends Component {
  render() {
    const {
      name,
      onClick
    } = this.props;

    return (
      <div onClick={onClick}className="item">
        {name}
      </div>
    );
  }
}

export default Item;
