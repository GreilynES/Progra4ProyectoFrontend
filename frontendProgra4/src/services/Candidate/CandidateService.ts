import api from "../../api/apiConfiguration";
import type { Candidate } from "../../models/Candidates/Candidate";

// GET: Obtener todos los candidatos
export async function getAllCandidates(): Promise<Candidate[]> {
  const response = await api.get("/Candidate");
  return response.data;
}

export async function getCandidatesByName(name?: string): Promise<Candidate[]> {
  const response = await api.get(`/Candidate?name=${name}`);
  return response.data;
}

// POST: Crear candidato
export async function createCandidate(candidate: Candidate): Promise<Candidate> {
  const response = await api.post("/Candidate", candidate);
  return response.data;
}


// PUT: Actualizar candidato por ID
export async function updateCandidate(id: number, candidate: Candidate): Promise<Candidate> {
  const response = await api.put(`/Candidate/${id}`, candidate);
  return response.data;
}

// DELETE: Eliminar candidato por ID
export async function deleteCandidate(id: number): Promise<void> {
  await api.delete(`/Candidate/${id}`);
}

// POST: Login que devuelve token + candidato
export async function login(user: { email: string; password: string }) {
  const response = await api.post("/auth/login", user);
  return response.data; // { token, candidate }
}
