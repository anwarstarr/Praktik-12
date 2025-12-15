import { createSlice } from '@reduxjs/toolkit';

const load = () => {
  try {
    const raw = localStorage.getItem('counter_state');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const save = (state) => {
  try {
    localStorage.setItem('counter_state', JSON.stringify({
      value: state.value,
      step: state.step ?? 1
    }));
  } catch {}
};

const persisted = load();

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: persisted?.value ?? 0, step: persisted?.step ?? 1, previous: null },
  reducers: {
    increment: (state) => {
      state.previous = state.value;
      state.value += (state.step ?? 1);
      save(state);
    },
    decrement: (state) => {
      state.previous = state.value;
      state.value -= (state.step ?? 1);
      save(state);
    },
    reset: (state) => {
      state.previous = state.value;
      state.value = 0;
      save(state);
    },
    incrementByAmount: (state, action) => {
      state.previous = state.value;
      state.value += Number(action.payload) || 0;
      save(state);
    },
    setStep: (state, action) => {
      state.step = Number(action.payload) || 1;
      save(state);
    },
    undo: (state) => {
      if (state.previous !== null) {
        const tmp = state.value;
        state.value = state.previous;
        state.previous = tmp;
        save(state);
      }
    }
  }
});

export const { increment, decrement, reset, incrementByAmount, setStep, undo } = counterSlice.actions;
export default counterSlice.reducer;