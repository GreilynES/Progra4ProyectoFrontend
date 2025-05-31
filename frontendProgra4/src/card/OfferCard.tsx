function OfferCard({ offer, onApply, hasApplied }: any) {
   return (
    <div className="CardOffer">
      <p><strong>Puesto:</strong> {offer.offerName}</p>
      <p><strong>Empresa:</strong> {offer.companyName}</p>
      <p><strong>Descripción:</strong> {offer.offerDescription}</p>

      <p><strong>Habilidades requeridas:</strong></p>
      <div className="skills-container">
        {offer.skillNames.map((skill: string, i: number) => (
          <span key={i} className="skill-pill">
            {skill}
          </span>
        ))}
      </div>

      {hasApplied ? (
        <button disabled className="button-disabled-Application">Ya postulado</button>
      ) : (
        <button onClick={onApply} className="button-hasApplied">Postularse</button>
      )}
    </div>
  );
}

export default OfferCard;
