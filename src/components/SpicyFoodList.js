import React, { useState } from "react";
import { spicyFoods, getNewRandomSpicyFood } from "../data";

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);
  const [filterBy, setFilterBy] = useState("All");


  const foodsToDisplay = foods.filter((food) => {
    if (filterBy === "All"){
      return true;
    }
    else{
      return food.cuisine === filterBy
    }
  })

  // newFood holds random food selected from spicy food
  // creating new variable newFoodArray to prevent mutating the original array and pass it to useState
  function handleAddFood() {
    const newFood = getNewRandomSpicyFood();
    const newFoodArray = [...foods, newFood]
    setFoods(newFoodArray)
  }

  // loops over the original array of food to display them before having to add some
  // food.id on handleLiClick throws effect on food with the specific id selected
  const foodList = foodsToDisplay.map((food) => (
    <li key={food.id} onClick={() => handleLiClick(food.id)}>
      {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
    </li>
  ));

  // removing list of spicyfoods onClick
  //  map will iterate through the array and return new array
  // food.id !== id will remove the selected id from the list
  function handleLiClick(id){
    const newFoodArray = foods.map((food) => {
      if(food.id === id){
        return {...food, heatLevel: food.heatLevel + 1};
      }
      else{
        return food;
      }
    })
    setFoods(newFoodArray);
  }


  ////// this code will delete the selected list of food from list
  // function handleLiClick(id) {
  //   const newFoodArray = foods.filter((food) => food.id !== id);
  //   setFoods(newFoodArray);
  // }

  // onClicking the button, new list of food is rendered

  function handleFilterChange(event) {
    setFilterBy(event.target.value);
  }

  return (
    <div>
      <select name="filter" onChange={handleFilterChange}>
        <option value="All">All</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select>
      <div>
      <button onClick={handleAddFood}>Add New Food</button>
      <ul>{foodList}</ul>
      </div>
    </div>
  );
}

export default SpicyFoodList;