import ProfileCard from "../card/ProfileCard";
import { useProfileLogic } from "../services/Candidate/CandidateHook";

const ProfilePage = () => {
  const {
    candidate,
    isLoading,
    allSkills,
    hasSkill,
    smartToggleSkill,
  } = useProfileLogic();

  if (isLoading) return <p>Loading candidate data...</p>;
  if (!candidate) return <p>There's not enough information about the logged candidate.</p>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1 className="profile-main-title">My Profile</h1>
        <p className="profile-subtitle-text">Manage your profile and skills</p>
      </div>

      <ProfileCard
        candidate={candidate}
        allSkills={allSkills}
        hasSkill={hasSkill}
        toggleSkill={smartToggleSkill}
      />
    </div>
  );
};

export default ProfilePage;
