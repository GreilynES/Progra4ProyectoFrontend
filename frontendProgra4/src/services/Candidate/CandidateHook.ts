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

// ✅ Obtener todos los candidatos (fetch manual)
export const useGetCandidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getAllCandidates();
      setCandidates(data);
    })();
  }, []);

  return { candidates };
};

// ✅ Obtener candidatos con React Query
export const useGetCandidates_ReactQuery = () => {
  const { data: candidates, isPending, error } = useQuery({
    queryKey: ["candidates"],
    queryFn: getAllCandidates,
  });

  return { candidates, isPending, error };
};

// candidato logueado desde localStorage
export const useLoggedCandidate = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem("candidate");
    if (data) {
      try {
        const parsed: Candidate = JSON.parse(data);
        setCandidate(parsed);
      } catch (err) {
        console.error("Error al leer los datos del candidato");
      }
    }
    setIsLoading(false);
  }, []);

  return { candidate, isLoading };
};

// candidato con React Query
export const useCreateCandidateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (candidate: Candidate) => {
      const created = await createCandidate(candidate);
      console.log("✅ Candidato creado:", created);
      return created;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["candidates"] });
    },
    onError: (err) => {
      console.error("❌ Error al crear candidato", err);
    },
  });
};

// ✅ Eliminar candidato
export const useDeleteCandidateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCandidate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["candidates"] });
    },
  });
};

// ✅ Login con token
export const useLoginMutation = () => {
  return useMutation({
    mutationFn: login,
  });
};

// ✅ Habilidades del candidato
export const useCandidateSkills = (candidateId?: number) => {
  const [allSkills, setAllSkills] = useState<Skill[]>([]);
  const [candidateSkills, setCandidateSkills] = useState<CandidateSkill[]>([]);

  const loadSkills = async () => {
    try {
      const skills = await fetchAllSkills();
      setAllSkills(skills);
    } catch (e) {
      console.error("❌ Error al cargar habilidades", e);
    }
  };

  const loadCandidateSkills = async () => {
    if (!candidateId) return;
    try {
      const skills = await fetchCandidateSkills(candidateId);
      setCandidateSkills(skills);
    } catch (e) {
      console.error("❌ Error al cargar habilidades del candidato", e);
    }
  };

  const toggleSkill = async (skillId: number) => {
    const hasSkill = candidateSkills.some((cs) => cs.skillId === skillId);
    try {
      if (candidateId) {
        if (hasSkill) {
          await deleteCandidateSkill(candidateId, skillId);
        } else {
          await addCandidateSkill(candidateId, skillId);
        }
        await loadCandidateSkills();
      }
    } catch (e) {
      console.error("❌ Error al modificar habilidad", e);
    }
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
