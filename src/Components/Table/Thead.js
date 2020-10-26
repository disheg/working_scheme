import React from 'react';
import PropTypes from 'prop-types';

const _ = require('lodash');

const Thead = ({ headers }) => (
  <thead>
    <tr>
      {headers.map((el) => (<th key={_.uniqueId(el)}>{el}</th>))}
    </tr>
  </thead>
);

Thead.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Thead;
