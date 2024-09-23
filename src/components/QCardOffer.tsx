import { FC } from "react";
import QHeading from "./QHeading";
import QRating from "./QRating";
import QPrice from "./QPrice";
import QText from "./QText";
import QButton from "./QButton";

interface QCardOfferProps {
  courseName: string;  // Nome do curso
  rating: number;      // Avaliação numérica (por exemplo, de 1 a 5)
  fullPrice: number;   // Preço total, tipado como string para formatação
  offeredPrice: number;// Preço com desconto, também como string
  discount: string;    // Percentual de desconto
  kind: string;        // Tipo de curso (presencial, online, etc.)
  level: string;       // Nível do curso (graduação, pós, etc.)
  iesLogo: string;     // URL do logo da instituição
  iesName: string;     // Nome da instituição
}

const calculateDiscountPercentage = (fullPrice: number, offeredPrice: number): string => {
  if (fullPrice === 0) return '0%'; // Evita divisão por zero
  const discount = ((fullPrice - offeredPrice) / fullPrice) * 100;
  return `${discount.toFixed(0)}%`;
};

const QCardOffer: FC<QCardOfferProps> = ({
  courseName,
  rating,
  fullPrice,
  offeredPrice,
  kind,
  level,
  iesLogo,
  iesName,
}) => {
  const discountPercentage = calculateDiscountPercentage(fullPrice, offeredPrice);

  return (
    <article className="bg-white p-6 rounded-lg shadow-sm border flex flex-col justify-between items-start gap-3">
      <img src={iesLogo} alt={iesName} className="h-10 object-contain" />
      <QHeading tag="h2" size="sm">
        {courseName}
      </QHeading>
      <QRating rating={rating} />
      <QPrice
        fullPrice={`R$` + fullPrice}
        offeredPrice={`R$` + offeredPrice}
        discount={discountPercentage}
      />
      <div>
        <QText tag="p">{kind}</QText>
        <QText tag="p" color="minor" size="sm">
          {level}
        </QText>
      </div>
      <QButton tag="a" size="sm" className="w-full">
        Quero esta bolsa
      </QButton>
    </article>
  );
};

export default QCardOffer;
