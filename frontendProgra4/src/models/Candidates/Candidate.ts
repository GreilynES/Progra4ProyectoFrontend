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
    name: '',
    firstLastName: '',
    secondLastName: '',
    email: '',
    password: '',
    role: ''
}

export const CandidateInitialStateLabels = {
    name: '',
    firstLastName: '',
    secondLastName: '',
    email: '',
    password: ''
}