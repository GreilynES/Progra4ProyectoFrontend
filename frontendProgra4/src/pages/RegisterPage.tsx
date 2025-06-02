// RegisterPage.tsx
import RegisterCard from "../card/RegisterCard";
import { useForm } from '@tanstack/react-form';
import { useCreateCandidateMutation } from '../services/Candidate/CandidateHook';
import {useRouter } from '@tanstack/react-router';
import { useState } from 'react';
import { RegisterSchema } from '../schemas/schemas';
import { showErrorAlertEmpty, showErrorDuplicateEmail, showSuccessAlertRegister } from '../utils/alerts';
import { validateRegisterForm } from '../utils/validation';
import { CandidateInitialState } from '../models/Candidates/Candidate';

const RegisterPage = () => {
  const router = useRouter();
  const createCandidateMutation = useCreateCandidateMutation();
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const form = useForm({
    defaultValues: CandidateInitialState,
    onSubmit: async ({ value }) => {
      const validation = RegisterSchema.safeParse(value);
      if (!validation.success) {
        const errors = validateRegisterForm(value);
        if (errors) {
          setFormErrors(errors);
          showErrorAlertEmpty('Please fill out all fields correctly.');
          return;
        }
      }
      try {
        await createCandidateMutation.mutateAsync(value);
        await showSuccessAlertRegister('You can now log in.');
        router.navigate({ to: "/login" });
        form.reset();
      } catch (error: any) {
        if (error?.response?.status === 404) {
          showErrorDuplicateEmail('A candidate with that email already exists.');
        }
      }
    },
  })

  return (
    <div className="register-container">
      <h1 className="register-title">Create your account</h1>
      <RegisterCard form={form} formErrors={formErrors} setFormErrors={setFormErrors} />
    </div>
  )
}

export default RegisterPage;
