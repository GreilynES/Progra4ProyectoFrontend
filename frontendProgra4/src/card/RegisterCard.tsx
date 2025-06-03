import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { UserRound, Mail, Lock } from 'lucide-react';
import { Link } from '@tanstack/react-router';

const RegisterCard = ({ form, formErrors, setFormErrors }: any) => (
  <form className="register-form" onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }}>
    <form.Field name="name">
      {(field: any) => (
        <div className="register-field">
          <label htmlFor="name" className="register-label">First Name *</label>
          <div className="input-icon-wrapper">
            <UserRound className="input-icon" />
            <input className="register-input" id="name" placeholder="Enter your name"
              value={field.state.value} onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur} />
          </div>
          {formErrors.name && <p className="register-error">{formErrors.name}</p>}
        </div>
      )}
    </form.Field>

    <form.Field name="firstLastName">
      {(field:any) => (
        <div className="register-field">
          <label htmlFor="firstLastName" className="register-label">Last Name *</label>
          <div className="input-icon-wrapper">
            <UserRound className="input-icon" />
            <input className="register-input" id="firstLastName" placeholder="Enter your last name"
              value={field.state.value} onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur} />
          </div>
          {formErrors.firstLastName && <p className="register-error">{formErrors.firstLastName}</p>}
        </div>
      )}
    </form.Field>

    <form.Field name="secondLastName">
      {(field:any) => (
        <div className="register-field">
          <label htmlFor="secondLastName" className="register-label">Second Last Name *</label>
          <div className="input-icon-wrapper">
            <UserRound className="input-icon" />
            <input className="register-input" id="secondLastName" placeholder="Enter your second last name"
              value={field.state.value} onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur} />
          </div>
          {formErrors.secondLastName && <p className="register-error">{formErrors.secondLastName}</p>}
        </div>
      )}
    </form.Field>

    <form.Field name="phoneNumber">
      {(field:any) => (
        <div className="register-field">
          <label htmlFor="phoneNumber" className="register-label">Phone Number *</label>
          <PhoneInput 
          country="cr" 
          onlyCountries={['cr']}
          value={field.state.value?.toString() || ''}
            onChange={(value) => {
              field.handleChange(value);
              setFormErrors((prev: any) => ({ ...prev, phoneNumber: '' }));
            }} inputClass="register-input-phone"
            containerClass="register-phone-container" buttonClass="register-phone-button" />
          {formErrors.phoneNumber && <p className="register-error">{formErrors.phoneNumber}</p>}
        </div>
      )}
    </form.Field>

    <form.Field name="email">
      {(field:any) => (
        <div className="register-field">
          <label htmlFor="email" className="register-label">Email *</label>
          <div className="input-icon-wrapper">
            <Mail className="input-icon" />
            <input className="register-input" id="email" type="email" placeholder="Enter your email"
              value={field.state.value} onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur} />
          </div>
          {formErrors.email && <p className="register-error">{formErrors.email}</p>}
        </div>
      )}
    </form.Field>

    <form.Field name="password">
      {(field:any) => (
        <div className="register-field">
          <label htmlFor="password" className="register-label">Password *</label>
          <div className="input-icon-wrapper">
            <Lock className="input-icon" />
            <input className="register-input" id="password" type="password" placeholder="Create a password"
              value={field.state.value} onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur} />
          </div>
          {formErrors.password && <p className="register-error">{formErrors.password}</p>}
        </div>
      )}
    </form.Field>

    <form.Field name="confirmPassword">
      {(field:any) => (
        <div className="register-field">
          <label htmlFor="confirmPassword" className="register-label">Confirm Password *</label>
          <div className="input-icon-wrapper">
            <Lock className="input-icon" />
            <input className="register-input" id="confirmPassword" type="password" placeholder="Confirm your password"
              value={field.state.value} onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur} />
          </div>
          {formErrors.confirmPassword && <p className="register-error">{formErrors.confirmPassword}</p>}
        </div>
      )}
    </form.Field>

    <form.Subscribe selector={(state: { canSubmit: boolean; isSubmitting: boolean }) => [state.canSubmit, state.isSubmitting]}>
      {([canSubmit, isSubmitting]: [boolean, boolean]) => (
        <button type="submit" className="register-button" disabled={!canSubmit}>
          {isSubmitting ? 'Creating...' : 'Register'}
        </button>
      )}
    </form.Subscribe>

    <div className="register-info">
      Already have an account? <Link to="/login">Sing in here</Link>
    </div>
  </form>
);

export default RegisterCard;
