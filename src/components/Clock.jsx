import { useEffect, useState } from "react";

/**
 * Clock Component
 * This component renders a digital clock that displays the current time, updating every second.
 * 
 * @returns {JSX.Element} A React component that displays the current time.
 */
const Clock = () => {

  /**
   * useTime - Custom Hook
   * Manages the current time state and sets up an interval to update it every second.
   * 
   * @returns {Date} The current date and time.
   */
  
  function useTime() {
    // useState to store the current time
    const [time, setTime] = useState(() => new Date());

    // useEffect to set up a timer that updates the time every second
    useEffect(() => {
      // Set up an interval to update the time every 1000ms (1 second)
      const id = setInterval(() => {
        setTime(new Date()); // Update the time with the current date
      }, 1000);

      // Cleanup the interval on component unmount to avoid memory leaks
      return () => clearInterval(id);
    }, []); // Empty dependency array ensures this effect runs only once on mount

    return time; // Return the current time
  }

  return (
    <>
      {/* Display the current time in an h1 element */}
      <h1 className="text-xl font-bold font-mono text-primary border border-primary ml-3 px-2 py-1 rounded-lg shadow-md shadow-primary 
      hover:border-red-400 hover:shadow-red-400 hover:text-red-400">
        {useTime().toLocaleTimeString()} {/* Format the time to a human-readable string */}
      </h1>
    </>
  );
};

export default Clock;
