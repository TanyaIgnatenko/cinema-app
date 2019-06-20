import { useState, useCallback, useMemo } from 'react';

function useInputState({
  initialValue,
  shouldMatch = '/.*/',
  required = false,
}) {
  const [input, setInput] = useState(initialValue);
  const [touched, setTouched] = useState(false);

  const handleInputChange = useCallback(event => {
    setInput(event.target.value);
    setTouched(true);
  }, shouldMatch);

  const handleBlur = useCallback(() => {
    setTouched(true);
  }, []);

  const valid = useMemo(() => {
    const matchPattern = shouldMatch.test(input);
    const notEmpty = input !== '';

    return (!required || notEmpty) && matchPattern;
  }, [input, shouldMatch, required]);

  return [input, handleInputChange, handleBlur, valid, touched];
}

export { useInputState };
