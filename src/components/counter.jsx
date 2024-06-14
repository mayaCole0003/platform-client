import React from 'react';
import useStore from '../store';

const Counter = (props) => {
  const count = useStore((state) => state.count);
  return (
    <div>
      Current Count: {count}
    </div>
  );
};

export default Counter;