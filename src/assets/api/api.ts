import axios from "axios";

export interface Recipe {
  id: number;
  title: string;
  image: string;
}


export const searchRecipesByName= async (dishName: string): Promise<Recipe[]> => {
  const response= await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
    params:{
      query:dishName,
      number:9,
      apiKey:'e2131d2bdbaf4317a388c3200273f1b8'
    }
  })
return response.data.results;

};

searchRecipesByName("Pasta")
  .then((recipes) => {
    console.log(recipes);
  })
  .catch((error) => {
    console.error("Error fetching recipes:", error);
  });