import './App.css'
import {searchRecipesByName, type Recipe} from "./assets/api/api.ts";
import {useState} from "react";

function App() {
  const [dishesName, setDishesName] = useState<string>('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [currentDishes, setCurrentDishes] = useState<string>("");
  const [hasSearched, setHasSearched] = useState<boolean>(false);


  const handleClick = async (): Promise<void> => {
    if (dishesName.trim() !== "") {
      const data: Recipe[] = await searchRecipesByName(dishesName);
      setCurrentDishes(dishesName);
      setRecipes(data);
      setDishesName("");
      setHasSearched(true);

    }
  }
  const handleRefresh = async (): Promise<void> => {
    setCurrentDishes("");
    setHasSearched(false);
    setDishesName("");
  }


  return (
    <div className="app">
      <div className="container">
        <form className="search__form"
              onSubmit={(e) => {
                e.preventDefault();
                handleClick();
              }}>
          <input
            autoComplete="off"
            id="dish"
            value={dishesName}
            name="dish"
            type="text"
            onChange={(e) => setDishesName(e.target.value)}
          />
          <button className="search__button" onClick={handleClick}>Search</button>
        </form>

        {currentDishes && <h2>You search <span className="span__result">{currentDishes}</span></h2>}

        {!hasSearched &&
          (
            <p>Enter key ingredient</p>)
        }
        <div className="search__result">
          <div className="cards__all">

          {hasSearched && (
            recipes.length > 0 ? (
                recipes.map((recipe: Recipe) => (

                    <div className="card" key={recipe.id}>
                      <div className="card__box">
                        <h2 className="card__box-title">{recipe.title}</h2>
                      </div>
                      <img className="card__image" src={recipe.image} alt={recipe.title}/>

                    </div>

                ))
              )
              : (
                <p className="search__err">try another ingredient, this one is missing or nonexistent</p>
              ))}
          </div>

          {hasSearched &&(<button className="refresh__button" onClick={handleRefresh}>
            Clear All
          </button>)}

        </div>


      </div>
    </div>


  )
}

export default App;
