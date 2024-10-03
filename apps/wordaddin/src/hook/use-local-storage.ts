import { useState } from "react";

function useLocalStorage(key :any, initialValue:any) {
    // Get stored value from localStorage, or the initial value if not found
    const [storedValue, setStoredValue] = useState(() => {
      try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.error("Error reading localStorage key:", key, error);
        return initialValue;
      }
    });
    
    
    // Function to update stored value in both state and localStorage
    const setValue = (value :any) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error("Error setting localStorage key:", key, error);
      }
    };
  
    return [storedValue, setValue];
  }
  
  export default useLocalStorage;