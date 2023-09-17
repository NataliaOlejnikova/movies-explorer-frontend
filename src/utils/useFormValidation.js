import { useState } from 'react';

function useFormValidation(initialValues = {}, initialErrors = {}, initialIsValid = false) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrors);
  const [isValid, setIsValid] = useState(initialIsValid);

  function handleChange({ target }) {
    setValues({ ...values, [target.name]: target.value });
    setErrors({ ...errors, [target.name]: target.validationMessage });
    setIsValid(target.closest('form').checkValidity());
  }

  function resetForm(newValues = {}, newErrors = {}, newIsValid = false) {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }

  return {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    setIsValid,
  };
}

export default useFormValidation;
