import React, { useEffect, useState } from 'react';

type Candidate = {
  id: number;
  name: string;
  firstLastName: string;
  secondLastName: string;
  email: string;
  role: string;
};

const ProfilePage = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    const data = localStorage.getItem('candidate');
    if (data) {
      try {
        const parsed: Candidate = JSON.parse(data);
        setCandidate(parsed);
      } catch (err) {
        console.error('❌ Error al leer los datos del candidato');
      }
    }
  }, []);

  if (!candidate) return <p>No hay información del candidato logueado.</p>;

  return (
    <div>
      <h2>Resumen del Candidato</h2>
      <ul>
        <li><strong>ID:</strong> {candidate.id}</li>
        <li><strong>Nombre:</strong> {candidate.name}</li>
        <li><strong>Primer Apellido:</strong> {candidate.firstLastName}</li>
        <li><strong>Segundo Apellido:</strong> {candidate.secondLastName}</li>
        <li><strong>Email:</strong> {candidate.email}</li>
        <li><strong>Rol:</strong> {candidate.role}</li>
      </ul>
    </div>
  );
};

export default ProfilePage;
