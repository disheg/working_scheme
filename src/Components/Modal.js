import React from 'react';

const Header = ({ toggle, children }) => (
  <div className="modal-header">
    <div className="modal-title">{children}</div>
    <button type="button" className="close" onClick={toggle} data-dismiss="modal" aria-label="Close">
      <span aria-hidden="true">x</span>
    </button>
  </div>
);

const Body = ({ children }) => <div className="modal-body">{children}</div>;
const Footer = ({ children }) => <p className="modal-footer">{children}</p>;

class Modal extends React.Component {
  static defaultProps = {
    isOpen: false,
  };

  static Header = Header;

  static Body = Body;

  static Footer = Footer;

  render() {
    const { isOpen, children } = this.props;
    const modalClassName = isOpen ? "modal fade show" : "modal";
    const styleSheet = isOpen ? { display: 'block' } : { display: 'none' };
    return (
      <div className={modalClassName} style={styleSheet}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
