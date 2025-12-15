import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset, incrementByAmount, setStep, undo } from './counterSlice';
import './counter.css';

export default function Counter() {
  const dispatch = useDispatch();
  const { value, step } = useSelector(s => s.counter);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowUp') dispatch(increment());
      if (e.key === 'ArrowDown') dispatch(decrement());
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') dispatch(undo());
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [dispatch]);

  return (
    <div className="counter-root">
      <div className="card">
        <h1 className="title">Smart Counter</h1>

        <div className="display" aria-live="polite">{value}</div>

        <div className="controls">
          <button className="btn primary" aria-label="Increment" onClick={() => dispatch(increment())}>+</button>
          <button className="btn" aria-label="Decrement" onClick={() => dispatch(decrement())}>−</button>
          <button className="btn ghost" aria-label="Undo" onClick={() => dispatch(undo())}>↺</button>
        </div>

        <div className="row">
          <label>
            Step
            <input
              type="number"
              className="step-input"
              value={step}
              min="1"
              onChange={(e) => dispatch(setStep(Number(e.target.value || 1)))}
              aria-label="Step value"
            />
          </label>

          <label>
            Add amount
            <input
              type="number"
              className="amount-input"
              placeholder="e.g. 10"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  dispatch(incrementByAmount(Number(e.currentTarget.value || 0)));
                  e.currentTarget.value = '';
                }
              }}
            />
          </label>
        </div>

        <div className="row spaced">
          <button className="btn danger" onClick={() => dispatch(reset())}>Reset</button>
          <small className="hint">Shortcuts: ↑ ↓ | Ctrl/Cmd+Z = undo</small>
        </div>
      </div>
    </div>
  );
}