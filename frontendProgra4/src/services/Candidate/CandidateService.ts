import api from "../../api/apiConfiguration";
import type { Candidate } from "../../models/Candidates/Candidate";
import type { CandidateSkill } from "../../models/Candidates/CandidateSkill";
import type { Skill } from "../../models/Skill/Skill";

// CRUD
export async function getAllCandidates(): Promise<Candidate[]> {
  const response = await api.get("/Candidate");
  return response.data;
}

export async function getCandidatesByName(name?: string): Promise<Candidate[]> {
  const response = await api.get(`/Candidate?name=${name}`);
  return response.data;
}

export async function createCandidate(candidate: Candidate): Promise<Candidate> {
  const response = await api.post("/Candidate", candidate);
  return response.data;
}

export async function updateCandidate(id: number, candidate: Candidate): Promise<Candidate> {
  const response = await api.put(`/Candidate/${id}`, candidate);
  return response.data;
}

export async function deleteCandidate(id: number): Promise<void> {
  await api.delete(`/Candidate/${id}`);
}

// Login que devuelve token y candidato
export async function login(user: { email: string; password: string }) {
  const response = await api.post("/auth/login", user);
  return response.data;
}

// Validación de correo
export async function checkCandidateExists(email: string): Promise<boolean> {
  try {
    await api.get(`/Candidate/email/${email}`);
    return true; // Si encuentra, retorna true
  } catch (error: any) {
    if (error.response?.status === 404) {
      return false; // Si no existe
    }
    throw new Error("Error al verificar el correo"); // Error real
  }
}

// Habilidades
export async function fetchAllSkills(): Promise<Skill[]> {
  const response = await api.get("/Skill");
  return response.data;
}

export async function fetchCandidateSkills(candidateId: number): Promise<CandidateSkill[]> {
  const response = await api.get(`/CandidateSkill/candidate/${candidateId}`);
  return response.data;
}

export async function addCandidateSkill(candidateId: number, skillId: number) {
  return await api.post("/CandidateSkill", {
    candidateId,
    idSkill: skillId,
  });
}

export async function deleteCandidateSkill(candidateId: number, skillId: number) {
  return await api.delete(`/CandidateSkill/${candidateId}/${skillId}`);
}
