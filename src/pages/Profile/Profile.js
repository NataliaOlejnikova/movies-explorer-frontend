import Header from '../../components/Header/Header';
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo';

function Profile({
  isSubmitting,
  submittingError,
  onSubmit,
  onSignOut,
}) {
  return (
    <>
      <Header isLanding={false} />
      <ProfileInfo
        isSubmitting={isSubmitting}
        submittingError={submittingError}
        onSubmit={onSubmit}
        onSignOut={onSignOut}
      />
    </>
  );
}

export default Profile;
