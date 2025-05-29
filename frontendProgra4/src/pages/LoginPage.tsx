import { useForm } from '@tanstack/react-form';
import { useLoginMutation } from '../services/Candidate/CandidateHook';
import { Link, useRouter } from '@tanstack/react-router';
import { CandidateLoginInitialState } from '../models/Candidates/CandidateLogin';
import Swal from 'sweetalert2';

const Login = () => {
  const router = useRouter()
  const loginMutation = useLoginMutation();
  
  const form = useForm({
    defaultValues: CandidateLoginInitialState,
    onSubmit: async ({ value }) => {
      try {
        await loginMutation.mutateAsync(value);
        await Swal.fire({
          icon: 'success',
          title: 'Login exitoso',
          text: 'Has iniciado sesión correctamente',
          timer: 2000,
          showConfirmButton: false,
        });
        router.navigate({ to: '/profile' });
        // Redirigir y limpiar cualquier error anterior
        router.navigate({ to: '/profile' });

        // Esto borra errores de consola si los había (aunque no estrictamente necesario)
        console.clear();
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Login fallido',
          text: 'Credenciales incorrectas',
        });
      }
    },
  });

  return (
  <div className="login-container">
      <h1 className="login-title">Login</h1>

      <form
        className="login-form"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.Field name="email">
          {(field) => (
            <div className="login-field">
              <label className="login-label" htmlFor="email">Email*</label>
              <input
                className="login-input"
                id="email"
                type="email"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
            </div>
          )}
        </form.Field>

        <form.Field name="password">
          {(field) => (
            <div className="login-field">
              <label className="login-label" htmlFor="password">Password*</label>
              <input
                className="login-input"
                id="password"
                type="password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
            </div>
          )}
        </form.Field>

        {/* Eliminado: Olvidé mi contraseña */}

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <button
              type="submit"
              disabled={!canSubmit}
              className="login-button"
              style={{ marginTop: '1rem' }}
            >
              {isSubmitting ? 'Iniciando...' : 'Iniciar sesión'}
            </button>
          )}
        />

        <div className="login-info">
          Do not have an account? <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;