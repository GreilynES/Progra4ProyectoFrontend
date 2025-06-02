import type { Offer } from "../models/Offers/Offer";

type OfferProps = {
  offer: Offer;
  onCancel: () => void;
  isLoading?: boolean;
};

const OfferCardMine = ({ offer, onCancel, isLoading }: OfferProps) => {
  return (
    <div className="CardOffer">
      <p>
        <strong>Stand:</strong> {offer.name}
      </p>
      <p>
        <strong>Enterprise:</strong> {offer.company?.name}
      </p>
      <p>
        <strong>Description:</strong> {offer.description}
      </p>

      <div className="skills-container">
        <strong>Skills:</strong>
        <div style={{ marginTop: "0.5rem" }}>
          {offer.offerSkills?.map((skill) => (
            <span key={skill.skill.id} className="skill-pill">
              {skill.skill.name}
            </span>
          ))}
        </div>
      </div>

      <div className="cancel-button-container">
        <button
          className="cancel-application-button"
          onClick={onCancel}
          disabled={isLoading}
        >
          {isLoading ? "Removing..." : "Cancel Application"}
        </button>
      </div>
    </div>
  );
};

export default OfferCardMine;
