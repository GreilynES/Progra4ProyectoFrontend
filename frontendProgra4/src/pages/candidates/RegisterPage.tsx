import { useForm } from '@tanstack/react-form';
import { CandidateInitialState } from '../../models/Candidates/Candidate';
import { useCreateCandidateMutation } from '../../services/Candidate/CandidateHook';
import { Link, useRouter } from '@tanstack/react-router';
import { useState } from 'react';
import { RegisterSchema } from '../../schemas/schemas';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { showErrorAlertEmpty, showErrorDuplicateEmail, showSuccessAlertRegister } from '../../utils/alerts';
import { validateRegisterForm } from '../../utils/validation';
import { UserRound, Mail, Lock } from 'lucide-react';

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
  });

  return (
    <div className="register-container">
      <h1 className="register-title">Register Candidate</h1>
      <form className="register-form" onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }}>
        <form.Field name="name">
        {(field) => (
          <div className="register-field">
            <label htmlFor="name" className="register-label">First Name</label>
            <div className="input-icon-wrapper">
              <UserRound className="input-icon" />
              <input
                className="register-input"
                id="name"
                placeholder="John"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
            </div>
            {formErrors.name && <p className="register-error">{formErrors.name}</p>}
          </div>
        )}
      </form.Field>

      <form.Field name="firstLastName">
        {(field) => (
          <div className="register-field">
            <label htmlFor="firstLastName" className="register-label">Last Name</label>
            <div className="input-icon-wrapper">
              <UserRound className="input-icon" />
              <input
                className="register-input"
                id="firstLastName"
                placeholder="Doe"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
            </div>
            {formErrors.firstLastName && <p className="register-error">{formErrors.firstLastName}</p>}
          </div>
        )}
      </form.Field>

      <form.Field name="secondLastName">
        {(field) => (
          <div className="register-field">
            <label htmlFor="secondLastName" className="register-label">Second Last Name</label>
            <div className="input-icon-wrapper">
              <UserRound className="input-icon" />
              <input
                className="register-input"
                id="secondLastName"
                placeholder="Smith"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
            </div>
            {formErrors.secondLastName && <p className="register-error">{formErrors.secondLastName}</p>}
          </div>
        )}
      </form.Field>

      <form.Field name="phoneNumber">
        {(field) => (
          <div className="register-field">
            <label htmlFor="phoneNumber" className="register-label">Phone Number</label>
            <PhoneInput
              country="cr"
              value={field.state.value?.toString() || ''}
              onChange={(value) => {
                field.handleChange(value);
                setFormErrors((prev) => ({ ...prev, phoneNumber: '' }));
              }}
              inputClass="register-input-phone"
              containerClass="register-phone-container"
              buttonClass="register-phone-button"
            />
            {formErrors.phoneNumber && <p className="register-error">{formErrors.phoneNumber}</p>}
          </div>
        )}
      </form.Field>

      <form.Field name="email">
        {(field) => (
          <div className="register-field">
            <label htmlFor="email" className="register-label">Email</label>
            <div className="input-icon-wrapper">
              <Mail className="input-icon" />
              <input
                className="register-input"
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
            </div>
            {formErrors.email && <p className="register-error">{formErrors.email}</p>}
          </div>
        )}
      </form.Field>

      <form.Field name="password">
        {(field) => (
          <div className="register-field">
            <label htmlFor="password" className="register-label">Password</label>
            <div className="input-icon-wrapper">
              <Lock className="input-icon" />
              <input
                className="register-input"
                id="password"
                type="password"
                placeholder="••••••"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
            </div>
            {formErrors.password && <p className="register-error">{formErrors.password}</p>}
          </div>
        )}
      </form.Field>

      <form.Field name="confirmPassword">
        {(field) => (
          <div className="register-field">
            <label htmlFor="confirmPassword" className="register-label">Confirm Password</label>
            <div className="input-icon-wrapper">
              <Lock className="input-icon" />
              <input
                className="register-input"
                id="confirmPassword"
                type="password"
                placeholder="••••••"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
            </div>
            {formErrors.confirmPassword && <p className="register-error">{formErrors.confirmPassword}</p>}
          </div>
        )}
      </form.Field>


        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <button type="submit" className="register-button" disabled={!canSubmit}>
              {isSubmitting ? 'Creating...' : 'Register'}
            </button>
          )}
        </form.Subscribe>

        <div className="register-info">
          Already have an account? <Link to="/login">Sing in</Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;