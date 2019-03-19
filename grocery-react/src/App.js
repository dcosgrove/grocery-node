import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import Item from './Item';

class App extends Component {
  state = {
    items: []
  }

  componentDidMount = () => {
    axios.get('/api/items')
    .then(res => {
      console.log(res);
      const { items } = res.data;
      this.setState({
        items
      });
    });
  }

  onAdd = item => {
    axios.post('/api/items', {
      item: item
    })
    .then(res => {
      const { items } = res.data;
      this.setState({
        items
      });
    });
  }

  onRemove = selected => () => {
    axios.delete(`/api/items/${selected}`)
    .then(res => {
      const { items } = res.data;
      this.setState({
        items
      });
    });
  }

  submit = e => {
    e.preventDefault();

    const {
      value
    } = this.state;

    this.onAdd(value);
  }

  onChange = e => {
    this.setState({
      value: e.target.value
    });
  }

  render() {
    const {
      items = [],
      value = ''
    } = this.state;

    return (
      <div className="App">
        <h1>Grocery List</h1>
        <React.Fragment>
          {
            items.map(item => {
              return <Item
                key={item}
                name={item}
                onClick={this.onRemove(item)}/>
            })
          }
        </React.Fragment>
        <form onSubmit={this.submit}>
          <label>New item:</label>
          <input type="text" value={value} onChange={this.onChange}/>
        </form>
      </div>
    );
  }
}

export default App;
