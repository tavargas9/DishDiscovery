const favoriteButton= document.querySelector("#favorite-button")

let isFavorite = false;

function updateFavoriteButton(isFavorite) {
  const favoriteButton = document.getElementById('favorite-button');
  favoriteButton.textContent = isFavorite ? 'Remove from Favorites' : 'Save this recipe!';
}

function toggleFavorite() {
  isFavorite = !isFavorite;

  updateFavoriteButton(isFavorite);

  sendFavoriteStatusToServer(isFavorite);
}

function sendFavoriteStatusToServer(isFavorite) {
  fetch('/api/homeRoutes.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ isFavorite }),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Favorite status updated successfully:', data);
    })
    .catch(error => {
      console.error('Error updating favorite status:', error);
    });
}