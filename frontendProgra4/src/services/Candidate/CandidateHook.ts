// ./services/Candidate/CandidateHook.ts
import { useEffect, useState } from "react";
import {createCandidate, deleteCandidate, login, fetchAllSkills, fetchCandidateSkills, addCandidateSkill, deleteCandidateSkill, deleteCandidateOffer} from "./CandidateService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Candidate } from "../../models/Candidates/Candidate";
import type { CandidateSkill } from "../../models/Candidates/CandidateSkill";
import type { Skill } from "../../models/Skill/Skill";
import { useMyApplications } from "../Offer/OfferHook";
import { showWarningAlert } from "../../utils/alerts";

// Crear candidato
export const useCreateCandidateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCandidate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["candidates"] })
    },
  })
}

// Eliminar candidato
export const useDeleteCandidateMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteCandidate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["candidates"] })
    },
  })
}

// Login y guardar token + candidato
export const useLoginMutation = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      console.log(res.token)
      localStorage.setItem("token", res.token)
      localStorage.setItem("candidate", JSON.stringify(res.candidate))
    },
    onError: (error) => {
      console.error("Error de login", error)
    },
  })
}

// Obtener candidato logueado desde localStorage
export const useLoggedCandidate = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const data = localStorage.getItem("candidate")
    if (data) {
      const parsed: Candidate = JSON.parse(data)
      setCandidate(parsed)
    }
    setIsLoading(false)
  }, [])

  return { candidate, isLoading }
}

// Obtener todas las habilidades disponibles
export const useAllSkills = () => {
  return useQuery<Skill[]>({
    queryKey: ["allSkills"],
    queryFn: fetchAllSkills,
  })
}

// Obtener habilidades actuales del candidato
export const useCandidateSkillsData = (candidateId?: number) => {
  return useQuery<CandidateSkill[]>({
    queryKey: ["candidateSkills", candidateId],
    queryFn: () => fetchCandidateSkills(candidateId!),
    enabled: !!candidateId,
  })
}

// Agregar skill al candidato
export const useAddCandidateSkill = (candidateId?: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ skillId }: { skillId: number }) =>
      addCandidateSkill(candidateId!, skillId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["candidateSkills", candidateId] })
  })
}

// Eliminar skill del candidato
export const useRemoveCandidateSkill = (candidateId?: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ skillId }: { skillId: number }) =>
      deleteCandidateSkill(candidateId!, skillId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["candidateSkills", candidateId] })
  })
}

// Cancelar postulación
export const useRemoveCandidateOffer = (candidateId?: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ offerId }: { offerId: number }) =>
      deleteCandidateOffer(candidateId!, offerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["candidateOffers", candidateId] });
      queryClient.invalidateQueries({ queryKey: ["myApplications", candidateId] });
    },
  })
}

// Utilidad para alternar skills en perfil
export const useToggleCandidateSkill = (candidateId?: number, candidateSkills: CandidateSkill[] = []) => {
  const addSkill = useAddCandidateSkill(candidateId);
  const removeSkill = useRemoveCandidateSkill(candidateId);

  const hasSkill = (skillId: number) =>
    candidateSkills.some((cs) => cs.skillId === skillId);

  const toggleSkill = (skillId: number) => {
    hasSkill(skillId)
      ? removeSkill.mutate({ skillId })
      : addSkill.mutate({ skillId });
  }

  return { toggleSkill, hasSkill };
}

export const useCandidateSkills = (candidateId?: number) => {
  const { data: allSkills = [] } = useAllSkills();
  const { data: candidateSkills = [] } = useCandidateSkillsData(candidateId);
  const { toggleSkill, hasSkill } = useToggleCandidateSkill(candidateId, candidateSkills);

  return { allSkills, candidateSkills, toggleSkill, hasSkill };
}

export const useProfileLogic = () => {
  const { candidate, isLoading } = useLoggedCandidate();
  const { allSkills, toggleSkill, hasSkill } = useCandidateSkills(candidate?.id);
  const { data: myApplications = [] } = useMyApplications(candidate?.id);
  const removeCandidateOffer = useRemoveCandidateOffer(candidate?.id);

  const smartToggleSkill = async (skillId: number) => {
      const currentlyHasSkill = hasSkill(skillId)

      if (currentlyHasSkill) {
        const offersToLose = myApplications.filter((offer) => {
          const requiredSkillIds = offer.offerSkills?.map((s) => s.skillId) || [];
          const requiredSkill = requiredSkillIds.includes(skillId);
          const stillHasOthers = requiredSkillIds.some(
            (id) => id !== skillId && hasSkill(id)
          )

          return requiredSkill && !stillHasOthers;
        })
        // Si hay offers con esa skill muestra alerta
        if (offersToLose.length > 0) {
          const offerNames = offersToLose.map((o) => o.name).join(", ");
          const result = await showWarningAlert(
          `If you delete this skill, you will lose your application${offersToLose.length > 1 ? "s" : ""} to ${offerNames}. Are you sure?`
          )

          if (result.isConfirmed) {
            toggleSkill(skillId);

            offersToLose.forEach((offer) => {
              removeCandidateOffer.mutate({ offerId: offer.id });
            })
          }
          return;
        }
      }
      toggleSkill(skillId);
}
  return {
    candidate,
    isLoading,
    allSkills,
    hasSkill,
    smartToggleSkill,
  }
}