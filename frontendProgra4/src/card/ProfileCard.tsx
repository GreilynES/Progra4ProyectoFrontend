import { Mail, Phone, UserRound } from 'lucide-react';
import { formatPhoneNumber } from "../utils/phoneNumberCountry";
import type { Skill } from '../models/Skill/Skill';


function ProfileCard({ candidate, allSkills, hasSkill, toggleSkill }: any) {
  return (
    <div className="profile-items-container">
      <div className="profile-content">
        <div className="profile-card">
          <h2 className="profile-section-title">Personal Information</h2>

          <div className="profile-field">
            <label className="profile-field-label">Full name</label>
            <div className="profile-field-value">
              <span className="profile-icon"></span>
              <UserRound className="profile-icon-information"/>
              {candidate.name} {candidate.firstLastName} {candidate.secondLastName}
            </div>
          </div>

          <div className="profile-field">
            <label className="profile-field-label">Email</label>
            <div className="profile-field-value">
              <span className="profile-icon"></span>
              <Mail className="profile-icon-information" />
              {candidate.email}
            </div>
          </div>

          <div className="profile-field">
            <label className="profile-field-label">Role</label>
            <div className="profile-field-value">
              <span className="profile-icon"></span>
              <UserRound className="profile-icon-information"/>
              {candidate.role}
            </div>
          </div>

          <div className="profile-field">
            <label className="profile-field-label">Phone Number</label>
            <div className="profile-field-value">
              <span className="profile-icon"></span>
              <Phone className="profile-icon-information"/>
              {formatPhoneNumber(candidate.phoneNumber)}
            </div>
          </div>
        </div>
      </div>  

      <div className="profile-card">
        <h2 className="profile-section-title">My habilities</h2>
        <p className="profile-skills-description">
          Select up to 10 skills that best represent your experience. Job offers will be filtered according to these skills.
        </p>

        <div className="profile-skills-counter">
          Selected Skills ({allSkills.filter((skill: Skill) => hasSkill(skill.id)).length}/10)
        </div>

        <div className="profile-skills">
          {allSkills.map((skill: Skill) => (
            <button
              key={skill.id}
              onClick={() => toggleSkill(skill.id)}
              className={`skill-button ${hasSkill(skill.id) ? "skill-active" : ""}`}
            >
              {skill.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;