function OfferCard({ offer, onApply }: any) {
  return (
    <div className="border rounded-xl p-4 bg-black text-white space-y-2">
      <p><strong>Nombre Empresa:</strong> {offer.companyName}</p>
      <p><strong>Puesto:</strong> {offer.offerName}</p>
      <p><strong>Descripción:</strong> {offer.offerDescription}</p>
      
      <p><strong>Habilidades:</strong></p>
      <div className="flex flex-wrap gap-2">
        {offer.skillNames.map((skill: string, i: number) => (
          <span key={i} className="px-3 py-1 border rounded-lg text-sm">
            {skill}
          </span>
        ))}
      </div>
      
      <button 
        onClick={onApply}
        className="mt-4 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        Aplicar a esta oferta
      </button>
    </div>
  );
}

export default OfferCard;