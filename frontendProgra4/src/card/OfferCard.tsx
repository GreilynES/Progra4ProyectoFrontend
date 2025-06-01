function OfferCard({ offer, onApply, hasApplied }: any) {
   return (
    <div className="CardOffer">
      <p><strong>Stand:</strong> {offer.offerName}</p>
      <p><strong>Enterprise:</strong> {offer.companyName}</p>
      <p><strong>Description:</strong> {offer.offerDescription}</p>

      <p><strong>Skills Required:</strong></p>
      <div className="skills-container">
        {offer.skillNames.map((skill: string, i: number) => (
          <span key={i} className="skill-pill">
            {skill}
          </span>
        ))}
      </div>

      {hasApplied ? (
        <button disabled className="button-disabled-Application">Already postulated</button>
      ) : (
        <button onClick={onApply} className="button-hasApplied">Apply to</button>
      )}
    </div>
  );
}

export default OfferCard;
