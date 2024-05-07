import React from "react";

interface CounterProps {
  /**
   * Initial value of the counter
   */
  initialValue: number;
}

function Counter({ initialValue }: CounterProps) {
  const [value, setValue] = React.useState(initialValue);

  const increment = () => setValue((prev) => prev + 1);
  const decrement = () => setValue((prev) => prev - 1);

  return React.createElement(
    "div",
    null,
    React.createElement(
      "div",
      {
        className: "text-md mb-2",
      },
      "Value: ",
      value
    ),
    React.createElement(
      "button",
      {
        className: "border rounded px-6 py-2 mr-2 hover:text-red-600",
        onClick: increment,
      },
      "+"
    ),
    React.createElement(
      "button",
      {
        className: "border rounded px-6 py-2 hover:text-red-600",
        onClick: decrement,
      },
      "-"
    )
  );
}

export default Counter;
