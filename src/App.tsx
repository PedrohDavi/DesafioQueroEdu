import { useEffect, useState } from "react";
import axios from "axios";

import QHeader from "./components/QHeader";
import QInput from "./components/QInput";
import QButton from "./components/QButton";
import QCardOffer from "./components/QCardOffer";
import QFooter from "./components/QFooter";
import QLayout from "./components/QLayout";
import QListCard from "./components/QListCard";
import QFormOrderByOffer from "./components/QFormOrderByOffer";
import QFormFilterOffer from "./components/QFormFilterOffer";
import QSectionForm from "./components/QSectionForm";

interface Offer {
  id: string; // Adicionando a propriedade 'id' necessária
  courseName: string;
  rating: number;
  fullPrice: number;
  offeredPrice: number;
  discount: number;
  kind: string;
  level: string;
  iesLogo: string;
  iesName: string;
}

const App: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([]); 
  const [searchTerm, setSearchTerm] = useState("");

  
  const formatOfferDetails = (kind: string, level: string) => {
    let formattedKind = kind === "presencial" ? "Presencial 🏫" : "EaD 🏠";
    let formattedLevel = "";
    switch (level) {
      case "bacharelado":
        formattedLevel = "Graduação (bacharelado) 🎓";
        break;
      case "tecnologo":
        formattedLevel = "Graduação (tecnólogo) 🎓";
        break;
      case "licenciatura":
        formattedLevel = "Graduação (licenciatura) 🎓";
        break;
      default:
        formattedLevel = level; 
    }
    return { formattedKind, formattedLevel };
  };

  // Requisição para a API ao carregar o componente
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/offers");
        setOffers(response.data); // Armazenar as ofertas no estado
      } catch (error) {
        console.error("Erro ao buscar as ofertas:", error);
      }
    };

    fetchOffers();
  }, []);

  const handleSearch = () => {
    const filteredOffers = offers.filter(offer =>
      offer.courseName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setOffers(filteredOffers);
  };

  

  
  return (
    <QLayout
      header={
        <QHeader>
          <QInput
            type="search"
            id="site-search"
            name="q"
            placeholder="Busque o curso ideal para você"
            aria-label="Buscar cursos e bolsas"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
  />
  <QButton type="button" onClick={handleSearch}>Buscar</QButton>
        </QHeader>
      }
      sidebar={<QFormFilterOffer />}
      footer={<QFooter />}
    >
      <QSectionForm
        title="Veja as opções que encontramos"
        orderBy={<QFormOrderByOffer />}
        filter={<QFormFilterOffer />}
      />

      <div className="mt-16">
        <QListCard cards={offers}>
          
        {(card) => {
            const { formattedKind, formattedLevel } = formatOfferDetails(
              card.kind,
              card.level
            );
            return (
              <QCardOffer
                key={card.id}
                courseName={card.courseName}
                rating={card.rating}
                fullPrice={(card.fullPrice)}
                offeredPrice={(card.offeredPrice)}
                discount={String(card.discount)}
                kind={formattedKind}
                level={formattedLevel}
                iesLogo={card.iesLogo}
                iesName={card.iesName}
              />
            );
          }}
        </QListCard>
      </div>
    </QLayout>
  );
};

export default App;
