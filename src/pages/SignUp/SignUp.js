import Register from '../../components/Register/Register';

function SignUp({ isSubmitting, submittingError, onSubmit }) {
  return (
    <Register
      isSubmitting={isSubmitting}
      submittingError={submittingError}
      onSubmit={onSubmit}
    />
  );
}

export default SignUp;
