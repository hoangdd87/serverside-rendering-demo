import React from 'react';
import PropTypes from 'prop-types';

const HighLightSearchText = ({ text, highlight, style }) => {
  if (!highlight.trim()) {
    return (<span style={ style }>{text}</span>);
  }
  const regex = new RegExp(`(${highlight})`, 'gi');
  const parts = text ? text.split(new RegExp(`(${highlight})`, 'gi')): [];
  return (
    <span style={ style }>
      {parts.filter(part => part).map((part, i) => (
        regex.test(part) ? <mark key={ i }>{part}</mark> : <span key={ i }>{part}</span>
      ))}
    </span>
  );
};

HighLightSearchText.defaultProps = {
  highlight: ''
}
HighLightSearchText.propTypes = {
  text: PropTypes.string,
  highlight: PropTypes.string,
  style: PropTypes.object
};

export default HighLightSearchText;
