function OfferCard({ offer, onApply, hasApplied }: any) {
  return (
    <div className="border rounded-xl p-4 bg-black text-white space-y-2">
      <p><strong>Nombre Empresa:</strong> {offer.companyName}</p>
      <p><strong>Puesto:</strong> {offer.offerName}</p>
      <p><strong>Descripción:</strong> {offer.offerDescription}</p>

      <p><strong>Habilidades:</strong></p>
      <div className="flex flex-wrap gap-2">
        {offer.skillNames.map((skill: string, i: number) => (
          <span
            key={i} className="px-3 py-1 border rounded-lg text-sm">
            {skill}
          </span>
        ))}
      </div>

      {hasApplied ? (
        <button
          disabled
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#d1fae5",
            color: "#065f46",
            border: "1px solid #10b981",
            borderRadius: "8px",
            cursor: "not-allowed",
            fontWeight: "bold",
            opacity: 0.85,
          }}
        >
          ✅ Postulado
        </button>
      ) : (
        <button
          onClick={onApply}
           className="className=mt-4 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700" >
          🚀 Postularse
        </button>
      )}
    </div>
  );
}

export default OfferCard;
