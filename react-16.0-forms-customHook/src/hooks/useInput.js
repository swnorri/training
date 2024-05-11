import { useState } from 'react';

export function useInput(defaultVal, validationFn) {
    const [enteredVal, setEnteredVal] = useState(defaultVal);
    const [didEdit, setDidEdit] = useState(false);

    const validValue = validationFn(enteredVal);

    function handleInputBlur(e) {
        setDidEdit(true);
    }
    function handleInputChange(e) {
        setEnteredVal(e.target.value);
        setDidEdit(false);
    }

    return {
        value : enteredVal,
        handleInputBlur,
        handleInputChange,
        hasError: didEdit && !validValue
    }
}