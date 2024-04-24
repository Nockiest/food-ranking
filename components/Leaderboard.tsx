import { Food } from '@/types/types';
import React from 'react';

interface Props {
  Foods: Food[]; // Assuming Food is a type representing your food data
}

const Leaderboard: React.FC<Props> = ({ Foods }) => {
  // if (!Foods || Foods.length === 0) {
  //   return <p>jídla nebyla načtena, Není co zobrazit...</p>;
  // }

  // Sort the foods based on their votes.total to votes.won ratio
  const sortedFoods = Foods.slice().sort((foodA, foodB) => {
    const ratioA = foodA.votes.total / foodA.votes.won;
    const ratioB = foodB.votes.total / foodB.votes.won;
    return ratioA - ratioB; // Sort in descending order
  });

  return (
    <div className="leaderboard-container max-w-md mx-auto p-4">
      <h2 className="leaderboard-title text-2xl font-bold mb-4">Leaderboard</h2>
      <ol className="leaderboard-list">
        {Foods.length > 0? (sortedFoods.map((food, index) => (
          <li key={index} className="leaderboard-item border border-gray-300 rounded-md p-4 mb-2">
            <span className="leaderboard-rank font-bold mr-2">{index + 1}.</span>
            <span className="leaderboard-name font-bold">{food.name}</span>
            <div className="leaderboard-details mt-2">
              <p className="leaderboard-description text-sm">{food.description}</p>
              <p className="leaderboard-percentage text-sm text-gray-600">Percentage of votes won: {((food.votes.won / food.votes.total) * 100).toFixed(2)}% {food.votes.won}/{food.votes.total}</p>
            </div>
          </li>
        ))) : (
       <>
       <p>jídla nebyla načtena, Není co zobrazit...</p> 
       <button className='btn-primary'>Zkusit znovu</button>
       </> 
        )
        
        }
      </ol>
    </div>
  );
};

export default Leaderboard;
