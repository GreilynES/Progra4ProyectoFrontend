import { useLoggedCandidate } from "../services/Candidate/CandidateHook"


const ProfilePage = () => {
  const { candidate, isLoading } = useLoggedCandidate()

  // ✅ Esperar a que termine de cargar antes de decidir
  if (isLoading) return <p>Cargando información del candidato...</p>

  // ✅ Ahora sí podemos verificar si hay datos
  if (!candidate) return <p>No hay información del candidato logueado.</p>

  return (
    <div>
      <h2>Resumen del Candidato</h2>
      <ul>
        <li>
          <strong>ID:</strong> {candidate.id}
        </li>
        <li>
          <strong>Nombre:</strong> {candidate.name}
        </li>
        <li>
          <strong>Primer Apellido:</strong> {candidate.firstLastName}
        </li>
        <li>
          <strong>Segundo Apellido:</strong> {candidate.secondLastName}
        </li>
        <li>
          <strong>Email:</strong> {candidate.email}
        </li>
        <li>
          <strong>Rol:</strong> {candidate.role}
        </li>
      </ul>
    </div>
  )
}

export default ProfilePage