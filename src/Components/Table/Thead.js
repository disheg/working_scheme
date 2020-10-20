import React from 'react';

const _ = require('lodash');

const Thead = (props) => {
  const { data } = props;
  return (
    <thead>
      <tr>
        {data.map((el) => (<th key={_.uniqueId(el)}>{el}</th>))}
      </tr>
    </thead>
  );
};

export default Thead;
