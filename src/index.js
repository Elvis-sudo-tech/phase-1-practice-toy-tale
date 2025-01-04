document.addEventListener("DOMContentLoaded", () => {
  const toyCollectionDiv = document.getElementById("toy-collection");
  const newToyBtn = document.getElementById("new-toy-btn");
  const addToyForm = document.querySelector(".add-toy-form");
  const nameInput = addToyForm.querySelector("input[name='name']");
  const imageInput = addToyForm.querySelector("input[name='image']");
  const apiUrl = "http://localhost:3000/toys";

  // Add Jessie dynamically if not in the database
  function addJessieIfNotExists() {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((toys) => {
        const jessieExists = toys.some((toy) => toy.name === "Jessie");
        if (!jessieExists) {
          const jessieToy = {
            name: "Jessie",
            image: "https://static.wikia.nocookie.net/toystory/images/a/a9/Jessie.png",
            likes: 0,
          };
          fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(jessieToy),
          }).then(() => fetchToys());
        }
      });
  }

  // Toggle visibility of the form
  newToyBtn.addEventListener("click", () => {
    addToyForm.style.display = addToyForm.style.display === "none" ? "block" : "none";
  });

  // Fetch and display all toys
  function fetchToys() {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((toys) => {
        toyCollectionDiv.innerHTML = ""; // Clear any existing content
        toys.forEach((toy) => renderToyCard(toy));
      });
  }

  // Render a toy card
  function renderToyCard(toy) {
    const toyCard = document.createElement("div");
    toyCard.classList.add("card");

    toyCard.innerHTML = `
      <h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar" />
      <p>${toy.likes} Likes</p>
      <button class="like-btn" id="${toy.id}">Like ❤️</button>
    `;

    const likeButton = toyCard.querySelector(".like-btn");
    likeButton.addEventListener("click", () => updateToyLikes(toy));

    toyCollectionDiv.appendChild(toyCard);
  }

  // Handle form submission to create a toy
  addToyForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const toyName = nameInput.value.trim();
    const toyImage = imageInput.value.trim();

    if (toyName && toyImage) {
      const newToy = {
        name: toyName,
        image: toyImage,
        likes: 0,
      };

      // Send POST request to create a new toy
      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newToy),
      })
        .then((response) => response.json())
        .then((toy) => {
          renderToyCard(toy); // Add new toy to the DOM
          addToyForm.reset(); // Clear the form inputs
        });
    } else {
      alert("Please fill in both fields!");
    }
  });

  // Update likes for a toy
  function updateToyLikes(toy) {
    const updatedLikes = toy.likes + 1;

    fetch(`${apiUrl}/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: updatedLikes }),
    })
      .then((response) => response.json())
      .then((updatedToy) => {
        const toyCard = document.getElementById(`${toy.id}`).parentElement;
        toyCard.querySelector("p").textContent = `${updatedToy.likes} Likes`;
      });
  }

  // Initial fetch to load all toys
  fetchToys();

  // Add Jessie to the database if not present
  addJessieIfNotExists();
});
