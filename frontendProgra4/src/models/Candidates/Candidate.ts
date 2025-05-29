export interface Candidate {
  id: number;
  name: string;
  firstLastName: string;
  secondLastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword?: string;
  role: string;
}

export const CandidateInitialState = {
  id: 0,
  name: '',
  firstLastName: '',
  secondLastName: '',
  phoneNumber: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: ''
};

export const CandidateInitialStateLabels = {
  name: '',
  firstLastName: '',
  secondLastName: '',
  phoneNumber: '',
  email: '',
  password: '',
  confirmPassword: '',
};
