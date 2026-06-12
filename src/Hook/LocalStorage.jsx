import { useState } from "react";
/*
site utiliser pour comprendre comment utiliser le useLocalStorage:
https://usehooks.com/uselocalstorage#:~:text=The%20useLocalStorage%20hook%20provides%20a%20convenient%20way%20to,updates%20the%20local%20storage%20whenever%20the%20state%20changes.

Code utiliser code pour creer le Hook useLocalStorage dans le dossier Hook a partir du site suivant:
https://www.geeksforgeeks.org/reactjs/reactjs-uselocalstorage-custom-hook/


*/ 
const useLocalStorage = (key, defaultValue) => {
    // Create state variable to store 
    // localStorage value in state
    const [localStorageValue, setLocalStorageValue] = useState(() => {
        try {
            const value = localStorage.getItem(key)
            // If value is already present in 
            // localStorage then return it
            
            // Else set default value in 
            // localStorage and then return it
            if (value) {
                return JSON.parse(value)
            } else {
                localStorage.setItem(key, JSON.stringify(defaultValue));
                return defaultValue
            }
        } catch (error) {
            localStorage.setItem(key, JSON.stringify(defaultValue));
            return defaultValue
        }
    })

    // this method update our localStorage and our state
    const setLocalStorageStateValue = (valueOrFn) => {
        let newValue;
        if (typeof valueOrFn === 'function') {
            const fn = valueOrFn;
            newValue = fn(localStorageValue)
        }
        else {
            newValue = valueOrFn;
        }
        localStorage.setItem(key, JSON.stringify(newValue));
        setLocalStorageValue(newValue)
    }
    return [localStorageValue, setLocalStorageStateValue]
}

export default useLocalStorage;