import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import createFavoriteRecipeObject from '../../utils/createFavoriteRecipeObject';
import whiteHeart from '../../images/whiteHeartIcon.svg';
import blackHeart from '../../images/blackHeartIcon.svg';

export default function RecipeDetailsInteractions({ recipe, recipeType }) {
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const currentFavoriteRecipesArray = JSON
      .parse(localStorage.getItem('favoriteRecipes')) ?? [];

    const favoriteRecipeAlreadyExists = currentFavoriteRecipesArray
      .find((favRecipe) => (
        Number(favRecipe.id) === Number(recipe.idDrink || recipe.idMeal)));

    if (favoriteRecipeAlreadyExists) setIsFav(true);
  }, [recipe]);

  function handleShare() {
    setIsLinkCopied(true);
    clipboardCopy(window.location.href);
  }

  function handleFavorite() {
    const favoriteRecipeObj = createFavoriteRecipeObject(recipe, recipeType);

    const currentFavoriteRecipesObj = JSON
      .parse(localStorage.getItem('favoriteRecipes')) ?? [];

    const favoriteRecipeAlreadyExists = currentFavoriteRecipesObj.find((favRecipe) => (
      Number(favRecipe.id) === Number(favoriteRecipeObj.id)
    ));

    if (favoriteRecipeAlreadyExists) {
      const currentFavoriteRecipes = JSON
        .parse(localStorage.getItem('favoriteRecipes'));

      const removedFavorite = currentFavoriteRecipes.filter((favRevipe) => (
        Number(favRevipe.id) !== Number(favoriteRecipeObj.id)
      ));

      setIsFav(false);

      return localStorage
        .setItem(
          'favoriteRecipes',
          JSON.stringify(removedFavorite),
        );
    }

    localStorage
      .setItem(
        'favoriteRecipes',
        JSON.stringify([...currentFavoriteRecipesObj, favoriteRecipeObj]),
      );

    setIsFav(true);
  }

  return (
    <div className="interaction-buttons">
      <button
        type="button"
        data-testid="share-btn"
        onClick={ handleShare }
      >
        Share
      </button>
      { isLinkCopied && <p>Link copied!</p>}
      <img
        role="button"
        data-testid="favorite-btn"
        onClick={ handleFavorite }
        src={ isFav ? blackHeart : whiteHeart }
        alt="favorite icon"
      />
    </div>
  );
}

RecipeDetailsInteractions.propTypes = {
  recipe: PropTypes.shape().isRequired,
  recipeType: PropTypes.string.isRequired,
};
