import { useForm } from '@tanstack/react-form';
import { CandidateInitialState, CandidateInitialStateLabels } from '../../models/Candidates/Candidate';
import { useCreateCandidateMutation } from '../../services/Candidate/CandidateHook';
import { Link, useRouter } from '@tanstack/react-router';
import { useState } from 'react';
import { RegisterSchema } from '../../schemas/schemas';
import { splitStringByCapital } from '../../utils/capitalLetter';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; // Necesario para estilos

const RegisterPage = () => {
  const router = useRouter();
  const createCandidateMutation = useCreateCandidateMutation();
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const form = useForm({
    defaultValues: CandidateInitialState,
    onSubmit: async ({ value }) => {
      const validation = RegisterSchema.safeParse(value);
      if (!validation.success) {
        const errors: Record<string, string> = {};
        validation.error.errors.forEach((err) => {
          const field = err.path[0] as string;
          errors[field] = err.message;
        });
        setAlertMessage( "Por favor, llena todos los campos correctamente.");
        setFormErrors(errors);
        return;
      }

      try {
        await createCandidateMutation.mutateAsync(value);
        router.navigate({ to: "/login" });
        form.reset();
      } catch (error: any) {
        if (error?.response?.status === 404) {
          setAlertMessage("⚠ Ya existe un candidato con ese correo electrónico.");
        } 
      }
    },
  });

  return (
    <div className="register-container">
      <h1 className="register-title">Register Candidate</h1>

      {alertMessage && (
        <div style={{ backgroundColor: "#ffe0e0", padding: "10px", borderRadius: "8px", color: "#b30000", marginBottom: "10px" }}>
          {alertMessage}
        </div>
      )}

      <form
        className="register-form"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        {Object.keys(CandidateInitialStateLabels).map((fieldName) => (
          <div key={fieldName} className="register-field">
            <form.Field
              name={fieldName as keyof typeof CandidateInitialState}
              children={(field) => (
                <>
                  <label htmlFor={field.name} className="register-label">
                    {splitStringByCapital(field.name)}:
                  </label>

                  {field.name === 'phoneNumber' ? (
                    <PhoneInput
                      country="cr"
                        value={field.state.value?.toString() || ''}
                      onChange={(value) => {
                        field.handleChange(value);
                        setFormErrors((prev) => ({ ...prev, [field.name]: "" }));
                      }}
                      inputClass="register-input"
                      containerClass="register-phone-container"
                      buttonClass="register-phone-button"
                    />
                  ) : (
                    <input
                      className="register-input"
                      id={field.name}
                      name={field.name}
                      type={field.name.toLowerCase().includes('password') ? 'password' : 'text'}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => {
                        field.handleChange(e.target.value);
                        setFormErrors((prev) => ({ ...prev, [field.name]: "" }));
                        setAlertMessage(null);
                      }}
                    />
                  )}

                  {formErrors[field.name] && (
                    <p className="register-error">{formErrors[field.name]}</p>
                  )}
                </>
              )}
            />
          </div>
        ))}

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <button type="submit" className="register-button" disabled={!canSubmit}>
              {isSubmitting ? 'Creando...' : 'Registrar'}
            </button>
          )}
        />
        <div className="register-info">
          Already have an account?
          <Link to="/login"> Sign in</Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
