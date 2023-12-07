const favoriteButton= document.querySelector("#favorite-button")
favoriteButton.addEventListener("click", toggleFavorite)
let isFavorite = false;

function updateFavoriteButton(isFavorite) {
  const favoriteButton = document.getElementById('favorite-button');
  favoriteButton.textContent = isFavorite ? 'Remove from Favorites' : 'Save this recipe!';

}

function toggleFavorite() {
    console.log("test")
  isFavorite = !isFavorite;

  updateFavoriteButton(isFavorite);
let recipeId= document.location.pathname.split("/")[3]
  sendFavoriteStatusToServer(recipeId);
}

function sendFavoriteStatusToServer(recipeId) {
  fetch('/api/dishes/favorite', {
   method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({recipeId}),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Favorite status updated successfully:', data);

    })
    .catch(error => {
      console.error('Error updating favorite status:', error);
    });
}