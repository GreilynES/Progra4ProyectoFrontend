export interface CandidateSkill {
  candidateId: number
  skillId: number
  skillName: string
}

export const CandidateSkillInitialState: CandidateSkill = {
  candidateId: 0,
  skillId: 0,
  skillName: "",
}