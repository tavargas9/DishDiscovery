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
let recipe_id= document.location.pathname.split("/")[3]
  sendFavoriteStatusToServer(recipe_id);
}

function sendFavoriteStatusToServer(recipe_id) {
  fetch('/api/dishes/favorite', {
   method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({recipe_id}),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Favorite status updated successfully:', data);

    })
    .catch(error => {
      console.error('Error updating favorite status:', error);
    });
}