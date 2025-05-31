import ProfileCard from "../card/ProfileCard";
import {
  useCandidateSkills,
  useLoggedCandidate,
  useRemoveCandidateOffer,
} from "../services/Candidate/CandidateHook";
import { useMyApplications } from "../services/Offer/OfferHook";

const ProfilePage = () => {
  const { candidate, isLoading } = useLoggedCandidate();

  // Ejecutar hooks siempre, aunque candidate sea null → ellos deben manejarlo con `enabled`
  const { allSkills, candidateSkills, toggleSkill, hasSkill } = useCandidateSkills(candidate?.id);
  const { data: myApplications = [] } = useMyApplications(candidate?.id);
  const removeCandidateOffer = useRemoveCandidateOffer(candidate?.id);

  // Nueva lógica inteligente de toggle
  const smartToggleSkill = (skillId: number) => {
    const currentlyHasSkill = hasSkill(skillId);

    toggleSkill(skillId); // Siempre ejecutamos el cambio

    if (currentlyHasSkill) {
      // Si estamos eliminando la skill...
      myApplications.forEach((offer) => {
        const requiredSkillIds = offer.offerSkills?.map((s) => s.skillId) || [];

        const requiredSkill = requiredSkillIds.includes(skillId);
        const stillHasOthers = requiredSkillIds.some(
          (id) => id !== skillId && hasSkill(id)
        );

        // Solo eliminar si ya no queda ninguna habilidad requerida
        if (requiredSkill && !stillHasOthers) {
          removeCandidateOffer.mutate({ offerId: offer.id });
        }
      });
    }
  };

  // Mostrar pantalla de carga o error
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
