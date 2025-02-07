import React from "react";
import CharactersList from "../сomponents/CharactersList";

const Home: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <CharactersList />
    </div>
  );
};

export default Home;