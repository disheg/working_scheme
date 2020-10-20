import React, { useState } from 'react';
import Modal from './Modal';

const _ = require('lodash');

const Btn = (props) => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const toggle = (e) => {
    e.preventDefault();
    setModal(!modal);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === '') {
      setError('Please enter a name');
      return;
    }
    const { func } = props;
    setError('');
    toggle(e);
    func(name);
    setName('');
  }

  const handleChange = (e) => {
    const value = _.trim(e.target.value);
    setName(value);
  }
    return (
      <div>
        <button type="button" className="modal-open-button btn btn-danger" onClick={toggle}>Open</button>
        <Modal isOpen={modal}>
          <Modal.Header toggle={toggle}>Add new person</Modal.Header>
          <Modal.Body>
          <form className="needs-validation" noValidate>
            <div className="form-row">
              <div className="col">
                <label htmlFor="recipient-name">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    id="recipient-name"
                    value={name || ''}
                    onChange={handleChange}
                    required
                  />
                {<div>{error}</div>}
              </div>
            </div>
          </form>
          </Modal.Body>
          <Modal.Footer>
            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={toggle}>Close</button>
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Send message</button>
          </Modal.Footer>
        </Modal>
      </div>
    );
}

export default Btn;
