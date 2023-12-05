const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#dish-name').value.trim();
  const needed_funding = document.querySelector('#dish-funding').value.trim();
  const description = document.querySelector('#dish-desc').value.trim();

  if (name && needed_funding && description) {
    const response = await fetch(`/api/dishes`, {
      method: 'POST',
      body: JSON.stringify({ name, needed_funding, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create dish');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/dishes/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete dish');
    }
  }
};

document
  .querySelector('.new-dish-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.dish-list')
  .addEventListener('click', delButtonHandler);
