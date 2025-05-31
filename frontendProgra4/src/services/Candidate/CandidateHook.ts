import { useEffect, useState } from "react";
import {
  createCandidate,
  deleteCandidate,
  login,
  fetchAllSkills,
  fetchCandidateSkills,
  addCandidateSkill,
  deleteCandidateSkill,
  deleteCandidateOffer,
} from "./CandidateService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Candidate } from "../../models/Candidates/Candidate";
import type { CandidateSkill } from "../../models/Candidates/CandidateSkill";
import type { Skill } from "../../models/Skill/Skill";


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

export const useAllSkills = () => {
  return useQuery<Skill[]>({
    queryKey: ["allSkills"],
    queryFn: fetchAllSkills
  });
};

export const useCandidateSkillsData = (candidateId?: number) => {
  return useQuery<CandidateSkill[]>({
    queryKey: ["candidateSkills", candidateId],
    queryFn: () => fetchCandidateSkills(candidateId!),
    enabled: !!candidateId, // Solo se ejecuta si candidateId está definido
  });
};

export const useAddCandidateSkill = (candidateId?: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ skillId }: { skillId: number }) =>
      addCandidateSkill(candidateId!, skillId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["candidateSkills", candidateId] }),
  });
};

export const useRemoveCandidateSkill = (candidateId?: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ skillId }: { skillId: number }) =>
      deleteCandidateSkill(candidateId!, skillId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["candidateSkills", candidateId] }),
  });
};



export const useRemoveCandidateOffer = (candidateId?: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ offerId }: { offerId: number }) =>
      deleteCandidateOffer(candidateId!, offerId), 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["candidateOffers", candidateId] });
      queryClient.invalidateQueries({ queryKey: ["myApplications", candidateId] });
    },
  });
};



export const useToggleCandidateSkill = (
  candidateId?: number,
  candidateSkills: CandidateSkill[] = []
) => {
  const addSkill = useAddCandidateSkill(candidateId);
  const removeSkill = useRemoveCandidateSkill(candidateId);

  const hasSkill = (skillId: number) =>
    candidateSkills.some((cs) => cs.skillId === skillId);

  const toggleSkill = (skillId: number) => {
    hasSkill(skillId)
      ? removeSkill.mutate({ skillId })
      : addSkill.mutate({ skillId });
  };

  return { toggleSkill, hasSkill };
};

export const useCandidateSkills = (candidateId?: number) => {
  const { data: allSkills = [] } = useAllSkills();
  const { data: candidateSkills = [] } = useCandidateSkillsData(candidateId);
  const { toggleSkill, hasSkill } = useToggleCandidateSkill(candidateId, candidateSkills);

  return { allSkills, candidateSkills, toggleSkill, hasSkill };
};