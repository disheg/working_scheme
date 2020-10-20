import React, { createRef } from 'react';

const _ = require('lodash');

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = createRef();
    this.state = {
      editing: false,
      value: this.props.value,
      error: '',
    };
  }

  onFocus() {
    this.setState({ editing: true }, () => this.inputRef.current.focus());
  }

  onBlur() {
    this.setState({ editing: false });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { value } = this.state;
    if(value === '') {
      this.setState({ error: 'Invalid format: HH:MM'});
      return;
    }
    this.setState({ error: ''});
    const { name, day, week } = this.props;
    this.props.onSubmit(name, week, [day, value]);
  }

  handleChange = (e) => {
    const value = _.trim(e.target.value);
    this.setState({ value: value });
  }

  render() {
    const { editing, error } = this.state;
    const { value } = this.props;
    return editing ? (
      <td>
        <div className="form-group">
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              className="form-control"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              ref={this.inputRef}
              value={this.state.value}
              onChange={this.handleChange}
              onBlur={() => this.onBlur()}
              onSubmit={this.handleSubmit}
            />
            <div>{error}</div>
          </form>
        </div>
      </td>
    )
      : (
        <td onClick={() => this.onFocus()}>
          <p className="text-center">{value}</p>
        </td>
      );
  }
}

export default Cell;
