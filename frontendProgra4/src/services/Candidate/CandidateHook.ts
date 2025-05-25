import { useEffect, useState } from "react";
import { getAllCandidates, createCandidate, deleteCandidate, login } from "./CandidateService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Candidate } from "../../models/Candidates/Candidate";

// Hook clásico
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

// Hook con React Query
export const useGetCandidates_ReactQuery = () => {
  const { data: candidates, isPending, error } = useQuery({
    queryKey: ['candidates'],
    queryFn: getAllCandidates,
  });

  return { candidates, isPending, error };
};

export const useLoggedCandidate = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const data = localStorage.getItem("candidate")
    if (data) {
      try {
        const parsed: Candidate = JSON.parse(data)
        setCandidate(parsed)
      } catch (err) {
        console.error("❌ Error al leer los datos del candidato")
      }
    }
    setIsLoading(false) // ✅ Importante: marcar como terminado
  }, [])

  return { candidate, isLoading }
}

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

// Eliminar candidato
export const useDeleteCandidateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCandidate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['candidates'] });
    },
  });
};

// ✅ Login funcional y guarda token + usuario
export const useLoginMutation = () => {
  return useMutation({
    mutationFn: login,
  });
};

