import { useEffect } from "react";
import { useCandidateSkills, useLoggedCandidate } from "../services/Candidate/CandidateHook";

const ProfilePage = () => {
  const { candidate, isLoading } = useLoggedCandidate();
  const {
    allSkills,
    loadSkills,
    loadCandidateSkills,
    toggleSkill,
    hasSkill,
  } = useCandidateSkills(candidate?.id);

  useEffect(() => {
    if (candidate) {
      loadSkills();
      loadCandidateSkills();
    }
  }, [candidate]);

  if (isLoading) return <p>Cargando datos del candidato...</p>;
  if (!candidate) return <p>No hay información del candidato logueado.</p>;

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">Resumen del Candidato</h2>
      <ul className="list-disc list-inside space-y-1">
        <li><strong>ID:</strong> {candidate.id}</li>
        <li><strong>Nombre:</strong> {candidate.name}</li>
        <li><strong>Primer Apellido:</strong> {candidate.firstLastName}</li>
        <li><strong>Segundo Apellido:</strong> {candidate.secondLastName}</li>
        <li><strong>Email:</strong> {candidate.email}</li>
        <li><strong>Rol:</strong> {candidate.role}</li>
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
