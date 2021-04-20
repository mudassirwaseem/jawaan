import React, { useState } from 'react';

const Button = () => {
  const [double, setDouble] = useState(false);
  return (
    <button
      disabled={double}
      onClick={() => {
        setDouble(true);
      }}
    >adasdas</button>
  );
};

export default Button;