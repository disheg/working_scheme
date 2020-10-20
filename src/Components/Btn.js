import React from 'react';
import Modal from './Modal';

class Btn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }

  toggle = (e) => {
    e.preventDefault();
    const { modal } = this.state;
    this.setState({
      modal: !modal,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { func } = this.props;
    const { name } = this.state;
    this.toggle(e);
    func(name);
    this.setState({ name: '' });
  }

  handleChange = (e) => {
    this.setState({ name: e.target.value });
  }

  render() {
    const { name, modal } = this.state;
    return (
      <div>
        <button type="button" className="modal-open-button btn btn-danger" onClick={this.toggle}>Open</button>
        <Modal isOpen={modal}>
          <Modal.Header toggle={this.toggle}>Add new person</Modal.Header>
          <Modal.Body>
            <div className="form-group">
                <label htmlFor="recipient-name" className="col-form-label">
                  Name:
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    id="recipient-name"
                    value={name || ''}
                    onChange={this.handleChange}
                  />
                </label>
              </div>
          </Modal.Body>
          <Modal.Footer>
            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.toggle}>Close</button>
            <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Send message</button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Btn;
