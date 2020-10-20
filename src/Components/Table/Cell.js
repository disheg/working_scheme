import React, { createRef } from 'react';

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = createRef();
    this.state = {
      editing: false,
      value: this.props.value,
    };
  }

  onFocus() {
    this.setState({ editing: true }, () => this.inputRef.current.focus());
  }

  onBlur() {
    this.setState({ editing: false });
  }

  handleSubmit = () => {
    const { value } = this.state;
    const { name, day, week } = this.props;
    this.props.onSubmit(name, week, [day, value]);
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  }

  render() {
    const { editing } = this.state;
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
