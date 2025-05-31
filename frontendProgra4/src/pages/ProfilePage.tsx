import ProfileCard from "../card/ProfileCard";
import { useCandidateSkills, useLoggedCandidate } from "../services/Candidate/CandidateHook";


const ProfilePage = () => {
  const { candidate, isLoading } = useLoggedCandidate();
  const { allSkills, toggleSkill, hasSkill } = useCandidateSkills(candidate?.id);

  if (isLoading) return <p>Loading candidate data...</p>;
  if (!candidate) return <p>There's no enough information about the logged candidate.</p>;

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
        toggleSkill={toggleSkill}
      />
    </div>
  );
};

export default ProfilePage;