export interface Candidate {
    id: number,
    Name: string,
    FirstLastName: string,
    SecondLastName: string,
    Email: string,
    Password: string
}

export const CandidateInitialState = {
    id: 0,
    Name: '',
    FirstLastName: '',
    SecondLastName: '',
    Email: '',
    Password: ''
}