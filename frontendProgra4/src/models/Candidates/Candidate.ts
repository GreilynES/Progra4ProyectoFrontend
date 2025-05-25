export interface Candidate {
    id: number,
    name: string,
    firstLastName: string,
    secondLastName: string,
    email: string,
    password: string
    role: string;
}

export const CandidateInitialState = {
    id: 0,
    Name: '',
    FirstLastName: '',
    SecondLastName: '',
    Email: '',
    Password: '',
    role: ''
}