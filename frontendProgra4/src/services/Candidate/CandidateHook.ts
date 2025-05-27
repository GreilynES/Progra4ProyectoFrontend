import { useEffect, useState } from "react";
import {
  getAllCandidates,
  createCandidate,
  deleteCandidate,
  login,
  fetchAllSkills,
  fetchCandidateSkills,
  addCandidateSkill,
  deleteCandidateSkill,
} from "./CandidateService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Candidate } from "../../models/Candidates/Candidate";
import type { CandidateSkill } from "../../models/Candidates/CandidateSkill";
import type { Skill } from "../../models/Skill/Skill";

// Obtener todos los candidatos
export const useGetCandidates_ReactQuery = () => {
  const { data: candidates, isPending, error } = useQuery({
    queryKey: ["candidates"],
    queryFn: getAllCandidates,
  });

  return { candidates, isPending, error };
};

// Crear candidato
export const useCreateCandidateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCandidate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["candidates"] });
    },
  });
};

// Eliminar candidato
export const useDeleteCandidateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCandidate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["candidates"] });
    },
  });
};

// Login y guarda token + candidato
export const useLoginMutation = () => {
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      console.log(res.token);
      localStorage.setItem("token", res.token);
      localStorage.setItem("candidate", JSON.stringify(res.candidate));
    },
    onError: (error) => {
      console.error("❌ Error de login", error);
    },
  });

  return mutation;
};

// Obtener candidato logueado desde localStorage
export const useLoggedCandidate = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem("candidate");
    if (data) {
      const parsed: Candidate = JSON.parse(data);
      setCandidate(parsed);
    }
    setIsLoading(false);
  }, []);

  return { candidate, isLoading };
};

// Obtener habilidades
export const useCandidateSkills = (candidateId?: number) => {
  const [allSkills, setAllSkills] = useState<Skill[]>([]);
  const [candidateSkills, setCandidateSkills] = useState<CandidateSkill[]>([]);

  const loadSkills = async () => {
    const skills = await fetchAllSkills();
    setAllSkills(skills);
  };

  const loadCandidateSkills = async () => {
    if (!candidateId) return;
    const skills = await fetchCandidateSkills(candidateId);
    setCandidateSkills(skills);
  };

  const toggleSkill = async (skillId: number) => {
    if (!candidateId) return;

    const hasSkill = candidateSkills.some((cs) => cs.skillId === skillId);

    if (hasSkill) {
      await deleteCandidateSkill(candidateId, skillId);
    } else {
      await addCandidateSkill(candidateId, skillId);
    }

    const updatedSkills = await fetchCandidateSkills(candidateId);
    setCandidateSkills(updatedSkills);
  };

  return {
    allSkills,
    candidateSkills,
    loadSkills,
    loadCandidateSkills,
    toggleSkill,
    hasSkill: (skillId: number) =>
      candidateSkills.some((cs) => cs.skillId === skillId),
  };
};
