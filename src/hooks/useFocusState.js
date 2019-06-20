import { useState } from 'react';

function useFocusState(initialValue) {
  const [focused, setFocus] = useState(initialValue);

  function handleFocusChange(event) {
    setFocus(event.target.name);
  }

  return [focused, handleFocusChange];
}

export { useFocusState };
