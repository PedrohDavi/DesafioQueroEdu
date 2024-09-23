import { ReactNode, HTMLAttributes } from "react";

interface Card extends HTMLAttributes<HTMLElement> {
  id: string; 
}

interface QListCardProps<T extends Card> {
  cards: T[];
  children: (card: T) => ReactNode;
}

const QListCard = <T extends Card>({
  cards,
  children,
  ...rest
}: QListCardProps<T>) => {
  return (
    <div {...rest} 
    className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {cards.map((card) => (
        <div key={card.id} className="w-full">
          {children(card)}
        </div>
      ))}
    </div>
  );
};

export default QListCard;
