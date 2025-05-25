import { useForm } from '@tanstack/react-form';
import { CandidateInitialState } from '../../models/Candidates/Candidate';
import { useCreateCandidateMutation } from '../../services/Candidate/CandidateHook';
import { Link, useRouter } from '@tanstack/react-router';

const RegisterPage = () => {
  const router = useRouter()
  const createCandidateMutation = useCreateCandidateMutation();

  const form = useForm({
    defaultValues: CandidateInitialState,
    onSubmit: async ({ value }) => {
      const mappedValue = {
        id: value.id,
        name: value.Name,
        firstLastName: value.FirstLastName,
        secondLastName: value.SecondLastName,
        email: value.Email,
        password: value.Password,
        role: value.role,
      };
      await createCandidateMutation.mutateAsync(mappedValue);
      router.navigate({ to: "/login" })
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
        {['Name', 'FirstLastName', 'SecondLastName', 'Email', 'Password'].map((fieldName) => (
          <div key={fieldName}>
            <form.Field
              name={fieldName as keyof typeof CandidateInitialState}
              children={(field) => (
                <>
                  <label htmlFor={field.name}>{field.name}:</label>
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.name.toLowerCase().includes('password') ? 'password' : 'text'}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
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
        <Link to="/login" > 
          Ya tienes una cuenta? Inicia sesión
        </Link>
      </form>
    </div>
  );
};

export default RegisterPage;