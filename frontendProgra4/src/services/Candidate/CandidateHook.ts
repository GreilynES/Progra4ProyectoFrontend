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

export const useCreateCandidateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCandidate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['candidates'] });
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

