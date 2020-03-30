import React from 'react';

const char = props => {
  const { letter, click } = props;
  const style = {
    display: 'inline-block',
    padding: '16px',
    textAlign: 'center',
    margin: '16px',
    border: '1px solid black',
  };

  return (
    <div onClick={click} style={style}>
      {letter}
    </div>
  );
};

export default char;
