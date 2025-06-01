import type { Offer } from "../models/Offers/Offer"


type OfferProps = {
    offer: Offer
}

const OfferCardMine = ({offer}: OfferProps) => {
   return (
     <div
        key={offer.offerId}
        className="bg-white rounded-xl shadow-md p-6 border border-[#81C3D7]">
        <h3 className="text-xl font-semibold text-[#2F6690] mb-1">
            {offer.offerName}
        </h3>
        <p className="text-sm text-gray-600 mb-2">
            Empresa: <span className="font-medium">{offer.company?.name}</span>
        </p>
        <p className="text-sm text-gray-700 mb-4">{offer.offerDescription}</p>

        <div className="mb-4">
            <p className="text-sm font-medium text-[#3A7CA5] mb-1">Habilidades requeridas:</p>
            <ul className="list-disc pl-5 text-sm text-gray-600">
                {offer.offerSkills?.map((skill) => (
                <li key={skill.skill.id}>{skill.skill.name}</li>
                ))}
            </ul>
        </div>
    </div>
  )
}

export default OfferCardMine