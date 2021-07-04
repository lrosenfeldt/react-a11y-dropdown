import React from "react";
import Dropdown from "./Dropdown";

function App() {
  return (
    <div className="h-full w-full grid grid-flow-row gap-y-8 place-items-start m-8">
      <h1 className="text-xl text-gray-900 font-bold">Hello from React!</h1>
      <Dropdown className="w-80" />
      <button
        className="rounded-full px-4 py-2 bg-yellow-500 text-gray-900"
        type="button"
      >
        Useless Button
      </button>
    </div>
  );
}

export default App;
