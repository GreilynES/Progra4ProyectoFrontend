import { useForm } from '@tanstack/react-form';
import { CandidateInitialState, CandidateInitialStateLabels } from '../../models/Candidates/Candidate';
import { useCreateCandidateMutation } from '../../services/Candidate/CandidateHook';
import { Link, useRouter } from '@tanstack/react-router';
import { useState } from 'react';
import { RegisterSchema } from '../../schemas/schemas';
import { splitStringByCapital } from '../../utils/capitalLetter';
import { checkCandidateExists } from '../../services/Candidate/CandidateService';

const RegisterPage = () => {
  const router = useRouter();
  const createCandidateMutation = useCreateCandidateMutation();
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const form = useForm({
    defaultValues: CandidateInitialState,
    onSubmit: async ({ value }) => {
      // Validar con Zod
      const validation = RegisterSchema.safeParse(value);
      if (!validation.success) {
        const errors: Record<string, string> = {};
        validation.error.errors.forEach((err) => {
          const field = err.path[0] as string;
          errors[field] = err.message;
        });
        setFormErrors(errors);
        return;
      }


      const exists = await checkCandidateExists(value.email);
      if (exists) {
        setFormErrors({ Email: "Ya existe un candidato con este correo." });
        alert("Ya existe un candidato con este correo.");
        return;
      }

      await createCandidateMutation.mutateAsync(value);
      router.navigate({ to: "/login" });
      form.reset();
    },
  });

  return (
    <div>
      <h1>Registrar Candidato</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        {Object.keys(CandidateInitialStateLabels).map((fieldName) => (
          <div key={fieldName}>
            <form.Field
              name={fieldName as keyof typeof CandidateInitialState}
              children={(field) => (
                <>
                  <label htmlFor={field.name}>{splitStringByCapital(field.name)}:</label>
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.name.toLowerCase().includes('password') ? 'password' : 'text'}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                      setFormErrors((prev) => ({ ...prev, [field.name]: "" }));
                    }}
                  />
                  {formErrors[field.name] && (
                    <p style={{ color: "red", fontSize: "0.8rem" }}>{formErrors[field.name]}</p>
                  )}
                </>
              )}
            />
          </div>
        ))}

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <button type="submit" disabled={!canSubmit}>
              {isSubmitting ? 'Creando...' : 'Registrar'}
            </button>
          )}
        />
        <Link to="/login">¿Ya tienes una cuenta? Inicia sesión</Link>
      </form>
    </div>
  );
};

export default RegisterPage;
