import { useReducer } from "react";
import Button from "../../ui/Button";

// Reducer function
const CounterReducer = (state: { count: number }, action: { type: "increment" | "decrement" }) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count > 0 ? state.count - 1 : 0 };
    default:
      return state;
  }
};

// Component
const CounterAppUsingReducerHook = () => {
  const [state, dispatch] = useReducer(CounterReducer, { count: 0 });

  return (
    <div className="container-md">
      <div className="card">
        {/* HEADER */}
        <div className="header-nav">
          <h3 className="w-full header-title text-center">Counter app using useReducer hook</h3>
        </div>

        <div className="center gap-xl p-2">
          <Button onClick={() => dispatch({ type: "increment" })}>Add</Button>
          <h3>{state.count}</h3>
          <Button onClick={() => dispatch({ type: "decrement" })} disabled={state.count === 0}>
            Sub
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CounterAppUsingReducerHook;
