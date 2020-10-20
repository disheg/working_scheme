import React from 'react';

const Table = (props) => {
  const { children } = props;
  return (
    <table className="table table-hover">{children}</table>
  );
};

export default Table;
