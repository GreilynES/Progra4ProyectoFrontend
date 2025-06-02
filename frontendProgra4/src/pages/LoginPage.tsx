import { useForm } from '@tanstack/react-form';
import { useLoginMutation } from '../services/Candidate/CandidateHook';
import { Link, useRouter } from '@tanstack/react-router';
import { CandidateLoginInitialState } from '../models/Candidates/CandidateLogin';
import { showErrorAlertLogin, showSuccessAlertLogin } from '../utils/alerts';
import { Mail, Lock } from 'lucide-react';

const Login = () => {
  const router = useRouter();
  const loginMutation = useLoginMutation();

  const form = useForm({
    defaultValues: CandidateLoginInitialState,
    onSubmit: async ({ value }) => {
      try {
        await loginMutation.mutateAsync(value);
        await showSuccessAlertLogin('You have logged in successfully. Welcome back!');
        router.navigate({ to: '/profile' });
        console.clear();
      } catch (error) {
        showErrorAlertLogin("Incorrect credentials.");
      }
    },
  })

  return (
    <div className="login-container">
      <h1 className="login-title">Sign in to your account</h1>

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
              <div className="input-icon-wrapper">
                <Mail className="input-icon" />
                <input
                  className="login-input"
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
              </div>
            </div>
          )}
        </form.Field>

        <form.Field name="password">
          {(field) => (
            <div className="login-field">
              <div className="input-icon-wrapper">
                <Lock className="input-icon" />
                <input
                  className="login-input"
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
              </div>
            </div>
          )}
        </form.Field>

        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <button
              type="submit"
              disabled={!canSubmit}
              className="login-button"
            >
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </button>
          )}
        </form.Subscribe>

        <div className="login-info">
          Do not have an account? <Link to="/register">Register here</Link>
        </div>
      </form>
    </div>
  )
}

export default Login;