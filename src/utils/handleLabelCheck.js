function handleLabelCheck({ target }) {
  const currProgress = JSON.parse(localStorage.getItem('inProgressRecipes'))
  || {
    cocktails: {},
    meals: {},
  };

  if (recipe.idDrink && target.checked) {
    currProgress.cocktails[recipe.idDrink] = checkedIngredients;
    setCheckedIngredients((prevState) => [...prevState, target.value]);
  }

  if (recipe.idMeal && target.checked) {
    currProgress.meals[recipe.idMeal] = checkedIngredients;
    setCheckedIngredients((prevState) => [...prevState, target.value]);
  }

  if (recipe.idDrink && !target.checked) {
    const filteredIngredients = checkedIngredients
      .filter((ingredient) => ingredient !== target.value);

    currProgress.cocktails[recipe.idDrink] = filteredIngredients;
    setCheckedIngredients(filteredIngredients);
  }

  if (recipe.idMeal && !target.checked) {
    const filteredIngredients = checkedIngredients
      .filter((ingredient) => ingredient !== target.value);

    currProgress.meals[recipe.idMeal] = filteredIngredients;
    setCheckedIngredients(filteredIngredients);
  }

  localStorage
    .setItem('inProgressRecipes', JSON.stringify(currProgress));
}

export default handleLabelCheck;
