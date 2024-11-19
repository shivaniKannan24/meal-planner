import React, { useState } from "react";
import MealList from "./MealList";

function App() {
  const [mealData, setMealData] = useState(null);
  const [calories, setCalories] = useState(2000);
  const [allergies, setAllergies] = useState("");
  const [diet, setDiet] = useState("balanced"); // "balanced", "vegetarian", "vegan", etc.

  function getMealData() {
    const allergens = allergies ? `&intolerances=${allergies}` : "";
    const dietType = diet ? `&diet=${diet}` : "";

    fetch(
      `https://api.spoonacular.com/mealplanner/generate?apiKey=cb1c464d94f142c08b156c5beddade8b&timeFrame=day&targetCalories=${calories}${allergens}${dietType}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMealData(data);
      })
      .catch(() => {
        console.log("error");
      });
  }

  function handleChange(e) {
    if (e.target.name === "calories") {
      setCalories(e.target.value);
    } else if (e.target.name === "allergies") {
      setAllergies(e.target.value);
    } else if (e.target.name === "diet") {
      setDiet(e.target.value);
    }
  }

  return (
    <div className="App">
      <section className="controls">
        <input
          type="number"
          name="calories"
          placeholder="Calories (e.g. 2000)"
          value={calories}
          onChange={handleChange}
        />
        <input
          type="text"
          name="allergies"
          placeholder="Allergies (comma separated)"
          value={allergies}
          onChange={handleChange}
        />
        <select name="diet" onChange={handleChange} value={diet}>
          <option value="balanced">Balanced</option>
          <option value="vegan">Vegan</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="glutenFree">Gluten-Free</option>
          <option value="keto">Keto</option>
          <option value="paleo">Paleo</option>
        </select>
        <button onClick={getMealData}>Get Daily Meal Plan</button>
      </section>
      {mealData && <MealList mealData={mealData} />}
    </div>
  );
}

export default App;
