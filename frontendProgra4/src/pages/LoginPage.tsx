import { useForm } from '@tanstack/react-form';
import { useLoginMutation } from '../services/Candidate/CandidateHook';
import { router } from '../router/router';

const Login = () => {
  const loginMutation = useLoginMutation();

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await loginMutation.mutateAsync(value);

        // Guardar token y candidato en localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('candidate', JSON.stringify(response.candidate));

        alert('Login exitoso');
        router.navigate({ to: '/profile' });
      } catch (error) {
        alert('Login fallido');
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <h2>Login</h2>

      <form.Field name="email">
        {(field) => (
          <>
            <label>Email:</label>
            <input
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
            />
          </>
        )}
      </form.Field>

      <form.Field name="password">
        {(field) => (
          <>
            <label>Contraseña:</label>
            <input
              type="password"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
            />
          </>
        )}
      </form.Field>

      <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
        {([canSubmit, isSubmitting]) => (
          <button type="submit" disabled={!canSubmit}>
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </button>
        )}
      </form.Subscribe>
    </form>
  );
};

export default Login;
