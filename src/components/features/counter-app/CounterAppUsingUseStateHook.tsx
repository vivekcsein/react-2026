import { useState } from "react";
import Button from "../../ui/Button";

const CounterAppUsingUseStateHook = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((prev) => prev + 1);
  };

  const decrement = () => {
    setCount((prev) => (prev > 0 ? prev - 1 : 0));
  };

  return (
    <div className="container-md">
      <div className="card">
        {/* HEADER */}
        <div className="header-nav">
          <h3 className="w-full header-title text-center">Counter app using useState hook</h3>
        </div>
        <div className="center gap-xl p-2">
          <Button onClick={increment}>Add</Button>
          <h3>{count}</h3>
          <Button onClick={decrement} disabled={count === 0}>
            Sub
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CounterAppUsingUseStateHook;
