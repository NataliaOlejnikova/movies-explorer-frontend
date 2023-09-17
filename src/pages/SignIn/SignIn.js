import Login from '../../components/Login/Login';

function SignIn({ isSubmitting, submittingError, onSubmit }) {
  return (
    <Login
      isSubmitting={isSubmitting}
      submittingError={submittingError}
      onSubmit={onSubmit}
    />
  );
}

export default SignIn;
