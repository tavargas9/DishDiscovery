const searchHandler = (event) => {
    event.preventDefault();
    const searchInput = document.getElementById('recipeSearchInput');
    const query = searchInput.value.trim();
    document.location.replace(`/search/${query}`);
};

const searchForm = document.getElementById('searchForm');

searchForm.addEventListener('submit', searchHandler);
