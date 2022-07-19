import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipeDetailsInteractions from '../RecipeDetailsInteractions';
import './RecipeInProgress.css';

export default function RecipeInProgress({ recipe }) {
  const [progressArray, setProgressArray] = useState([]);

  useEffect(() => {
    const currProgress = JSON.parse(localStorage.getItem('inProgressRecipes'))
    || {
      cocktails: {},
      meals: {},
    };

    setProgressArray(
      currProgress.cocktails[recipe.idDrink]
      ?? currProgress.meals[recipe.idMeal] ?? [],
    );
  }, []);

  useEffect(() => {
    const currProgress = JSON.parse(localStorage.getItem('inProgressRecipes'))
    || {
      cocktails: {},
      meals: {},
    };

    if (recipe.idDrink) {
      currProgress.cocktails[recipe.idDrink] = Array.from(new Set(progressArray));
    } else {
      currProgress.meals[recipe.idMeal] = Array.from(new Set(progressArray));
    }

    localStorage
      .setItem('inProgressRecipes', JSON.stringify(currProgress));
  }, [progressArray]);

  function getIngredientsKeys() {
    return Object.keys(recipe).filter((key) => key.includes('Ingredient'));
  }

  function handleLabelCheck({ target }) {
    if (progressArray.includes(target.value)) {
      setProgressArray((prevState) => (
        prevState.filter((ingredient) => ingredient !== target.value)
      ));
    } else {
      setProgressArray((prevState) => [...prevState, target.value]);
    }
  }

  return (
    <div className="recipe-in-progress-page-container">
      <h1 data-testid="recipe-title">{ recipe.strDrink || recipe.strMeal }</h1>
      <h3 data-testid="recipe-category">{ recipe.strAlcoholic || recipe.strCategory }</h3>
      <img
        data-testid="recipe-photo"
        src={ recipe.strDrinkThumb || recipe.strMealThumb }
        alt={ recipe.strDrink || recipe.strMeal }
      />
      <RecipeDetailsInteractions
        recipe={ recipe }
        recipeType={ recipe.strDrink ? 'drinks' : 'foods' }
      />
      {getIngredientsKeys().map((ingredientKey, index) => {
        if (!recipe[ingredientKey]) return;
        return (
          <label
            key={ Math.random() }
            htmlFor={ ingredientKey }
            data-testid={ `${index}-ingredient-step` }
            className={ progressArray?.includes(recipe[ingredientKey]) ? 'checked' : '' }
          >
            <input
              type="checkbox"
              id={ ingredientKey }
              onChange={ (e) => handleLabelCheck(e) }
              value={ recipe[ingredientKey] }
              defaultChecked={ progressArray?.includes(recipe[ingredientKey]) }
            />
            { recipe[ingredientKey] }
          </label>
        );
      })}
      <p data-testid="instructions">{ recipe.strInstructions }</p>
      <button type="button" data-testid="finish-recipe-btn">
        Finish recipe
      </button>
    </div>
  );
}

RecipeInProgress.propTypes = {
  recipe: PropTypes.shape().isRequired,
};
