import { Food } from '@/types/types';
import React from 'react';

interface Props {
  Foods: Food[]; // Assuming Food is a type representing your food data
}

const Leaderboard: React.FC<Props> = ({ Foods }) => {
  if (!Foods || Foods.length === 0) {
    return <p>jídla nebyla načtena, Není co zobrazit...</p>;
  }

  // Sort the foods based on their votes.total to votes.won ratio
//   const sortedFoods = Foods.slice().sort((foodA, foodB) => {
//     const ratioA = foodA.votes.total / foodA.votes.won;
//     const ratioB = foodB.votes.total / foodB.votes.won;
//     return ratioB - ratioA; // Sort in descending order
//   });

  return (
    <div>
      <h2>Leaderboard</h2>
      {/* <ol>
        {sortedFoods.map((food, index) => (
          <li key={index}>{food.name}</li>
        ))}
      </ol> */}
    </div>
  );
};

export default Leaderboard;
