import {useState, useCallback, useEffect} from "react";

export function useFormWithValidation(currentUser) {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [target, setTarget] = useState(null)

  const handleChange = (event) => {
    setTarget(event)
    const target = event;
    const name = target.name;
    const value = target.value;

    setValues(values => ({ ...values, [name]: value }));
    setErrors(values => ({ ...values, [name]: target.validationMessage }));
  };

  useEffect(() => {
    if (target) {
      handleCheckValidity(target)
    }
  }, [values, isValid])

  const handleCheckValidity = (target) => {
    const formCheckValidity = target.closest("form").checkValidity()

    if (currentUser && values.name === currentUser.data.name && currentUser && values.email === currentUser.data.email) {
      setIsValid(false)
    } else {
      setIsValid(formCheckValidity)
    }
  }

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, setValues, handleChange, errors, isValid, setIsValid, resetForm };
}