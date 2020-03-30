import React from 'react';

const validation = props => {
  const { length } = props;
  let tooLong = <p>Text is too long!</p>;
  let tooShort = <p>Text is too short!</p>;
  const data = length < 5 ? tooShort : tooLong;
  return data;
};

export default validation;
