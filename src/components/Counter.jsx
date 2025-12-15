import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset, incrementByAmount } from '../features/counterSlice';

const Counter = () => {
  const value = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);

  return (
    <>
      <div style={{ border: '1px solid #ddd', padding: 10, width: 320 }}>
        <h3>Counter : {value}</h3>
        
        <div style={{ marginBottom: 8 }}>
          <button 
            onClick={() => dispatch(increment())} 
            style={{ marginRight: 8 }}
          >
            Increment
          </button>
          <button 
            onClick={() => dispatch(decrement())}
            style={{ marginRight: 8 }}
          >
            Decrement
          </button>
          <button 
            onClick={() => dispatch(reset())} 
            style={{ marginLeft: 8 }}
          >
            Reset
          </button>
        </div>

        <div style={{ marginBottom: 8 }}>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <button 
            onClick={() => dispatch(incrementByAmount(amount))} 
            style={{ marginLeft: 8 }}
          >
            Add Amount
          </button>
        </div>

        <small>Note: You can add a specific amount to the counter using the input above.</small>
      </div>
    </>
  );
};

export default Counter;