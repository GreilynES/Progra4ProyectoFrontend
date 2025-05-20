// import React from 'react'
import { useForm } from '@tanstack/react-form'
// import { CandidateInitialState } from '../../models/Candidate'
// import { createCandidate } from '../../services/candidateService'

import { CandidateInitialState } from "../../models/Candidates/Candidate"
import { createCandidate } from "../../services/Candidate/CandidateService"

const CreateCandidateForm = () => {
  const form = useForm({
    defaultValues: CandidateInitialState,
    onSubmit: async ({ value }) => {
      try {
        const created = await createCandidate(value)
        console.log('✅ Candidato creado:', created)
        form.reset() // Limpia el formulario si querés
      } catch (err) {
        console.error('❌ Error al crear candidato', err)
      }
    },
  })

  return (
    <div>
      <h1>Registrar Candidato</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
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
      </form>
    </div>
  )
}

export default CreateCandidateForm