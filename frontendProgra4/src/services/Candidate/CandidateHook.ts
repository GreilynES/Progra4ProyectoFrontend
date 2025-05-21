import { useEffect, useState } from "react";

import { getAllCandidates, createCandidate, deleteCandidate, login } from "./CandidateService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Candidate } from "../../models/Candidates/Candidate";

// Hook clásico con useEffect
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
        queryFn: getAllCandidates
    });

    return { candidates, isPending, error };
};

// Hook para crear candidato
export const useCreateCandidateMutation = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createCandidate,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['candidates'] });
        }
    });

    return mutation;
};

// Hook para eliminar candidato
export const useDeleteCandidateMutation = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: deleteCandidate,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['candidates'] });
        }
    });

    return mutation;
};


export const useLoginMutation = () => {

    const mutation = useMutation({
        mutationFn: login,
        onSuccess: (res) => {
          // Invalidate and refetch
         localStorage.setItem('token', res);
         
        },
      })

      return mutation;
}