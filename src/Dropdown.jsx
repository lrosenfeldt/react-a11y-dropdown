import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
} from "react";

const options = ["Apfel", "Birne", "Zitrone", "Melone", "Nektarine"];

function useRandomId(str) {
  // |0 rounds the number
  const [id, setId] = useState(undefined);
  // update id synchronous to the first render, to prevent flickering
  useLayoutEffect(() => {
    setId(`${str ? str : "id"}-${(Math.random() * 1000) | 0}`);
  }, []);
  return id;
}

function useIndexHandler(intial = 0) {
  const [index, setIndex] = useState(intial);
  const selfRef = useRef(null);

  const handleKeyPress = useCallback((event) => {
    switch (event.code) {
      case "ArrowDown":
        setIndex((value) => (value < options.length - 1 ? value + 1 : value));
        break;
      case "ArrowUp":
        setIndex((value) => (value > 0 ? value - 1 : value));
        break;
      case "Home":
        setIndex(0);
        break;
      case "End":
        setIndex(options.length - 1);
        break;
      case "Enter":
        event.preventDefault();
        selfRef.current.blur();
        break;
      case "Escape":
        selfRef.current.blur();
        break;
      case "Tab":
        if (event.shiftKey) {
          event.preventDefault();
        }
        selfRef.current.blur();
        break;
    }
  });

  return [index, handleKeyPress, selfRef, setIndex];
}

function Dropdown({ className }) {
  const [expanded, setExpanded] = useState(false);
  const [activeIndex, handleKeyPress, listboxRef, setActiveIndex] =
    useIndexHandler();

  const buttonRef = useRef(null);

  const labelId = useRandomId("label");
  const buttonId = useRandomId("button");

  useEffect(() => {
    if (listboxRef.current && expanded) {
      listboxRef.current.focus();
    }
  }, [expanded]);

  return (
    <div className={className}>
      <span id={labelId}>Wähle eine Option:</span>
      <div>
        <button
          className={`text-lg rounded-md overflow-hidden bg-gray-50 before:bg-yellow-500 ${
            expanded ? "before:content-['▲']" : "before:content-['▼']"
          } before:inline-block before:px-2 before:py-1 before:mr-4 pr-4`}
          aria-haspopup="listbox"
          aria-labelledby={`${labelId} ${buttonId}`}
          aria-activedescendant={options[activeIndex]}
          id={buttonId}
          ref={buttonRef}
          onClick={() => setExpanded((prev) => !prev)}
        >
          {options[activeIndex]}
        </button>
        {expanded && (
          <ul
            className="relative overflow-y-auto mt-1 max-h-20"
            aria-labelledby={labelId}
            role="listbox"
            tabIndex="-1"
            ref={listboxRef}
            onKeyDown={handleKeyPress}
            onBlur={(event) => {
              if (event.relatedTarget !== buttonRef.current) {
                setExpanded(false);
              }
              buttonRef.current.focus();
            }}
          >
            {options.map((value, index) => (
              <li
                className={`pl-2 ${
                  index === activeIndex &&
                  "bg-gray-300 before:mr-2 before:content-['✓'] before:font-bold"
                }`}
                role="option"
                key={value}
                aria-selected={index === activeIndex}
                onClick={() => setActiveIndex(index)}
              >
                {value}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dropdown;
