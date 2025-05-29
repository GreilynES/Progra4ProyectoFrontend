
import { useCandidateSkills, useLoggedCandidate } from "../services/Candidate/CandidateHook";
import { formatPhoneNumber } from "../utils/phoneNumberCountry";

const ProfilePage = () => {
  // const { candidate, isLoading } = useLoggedCandidate();
  // const {
  //   allSkills,

  //   toggleSkill,
  //   hasSkill,
  // } = useCandidateSkills(candidate?.id);

  // // ✅ Limpiar skills anteriores y cargar nuevos cuando cambia el candidato
  // useEffect(() => {
  //   if (candidate?.id) {
  //     loadSkills();
  //     loadCandidateSkills();
  //   }
  // }, [candidate?.id]); // <-- Detecta cambio de ID específicamente

  // if (isLoading) return <p>Cargando datos del candidato...</p>;
  // if (!candidate) return <p>No hay información del candidato logueado.</p>;

    const { candidate, isLoading } = useLoggedCandidate();
    const {allSkills,toggleSkill,hasSkill,} = useCandidateSkills(candidate?.id);

    if (isLoading) return <p>Loading candidate data...</p>;
    if (!candidate) return <p>There´s no enough information about the logged candidate.</p>;

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">Candidate Resume</h2>
      <ul className="list-disc list-inside space-y-1">
        <li><strong>Name:</strong> {candidate.name}</li>
        <li><strong>First Lastname:</strong> {candidate.firstLastName}</li>
        <li><strong>Second Lastname:</strong> {candidate.secondLastName}</li>
        <li><strong>Phone Number:</strong> {formatPhoneNumber(candidate.phoneNumber)}</li>
        <li><strong>Email:</strong> {candidate.email}</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">Habilidades</h3>
      <div className="flex flex-wrap gap-3">
        {allSkills.map((skill) => (
          <button
            key={skill.id}
            onClick={() => toggleSkill(skill.id)}
            className={`px-4 py-2 rounded-full border text-sm ${
              hasSkill(skill.id)
                ? "bg-orange-400 text-white border-orange-400"
                : "bg-white text-black border-gray-300"
            }`}
          >
            {skill.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
