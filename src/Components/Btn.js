import React, { useState } from 'react';
import Modal from './Modal';

const Btn = (props) => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');

  const toggle = (e) => {
    e.preventDefault();
    setModal(!modal);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { func } = props;
    toggle(e);
    func(name);
    setName('');
  }

  const handleChange = (e) => {
    setName(e.target.value);
  }
    return (
      <div>
        <button type="button" className="modal-open-button btn btn-danger" onClick={toggle}>Open</button>
        <Modal isOpen={modal}>
          <Modal.Header toggle={toggle}>Add new person</Modal.Header>
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
                    onChange={handleChange}
                  />
                </label>
              </div>
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
