document.addEventListener("DOMContentLoaded", () => {
    const toyCollectionDiv = document.getElementById("toy-collection");
    const newToyBtn = document.getElementById("new-toy-btn");
    const addToyForm = document.querySelector(".add-toy-form");
    const nameInput = addToyForm.querySelector("input[name='name']");
    const imageInput = addToyForm.querySelector("input[name='image']");
    
    // Toggle visibility of the form
    newToyBtn.addEventListener("click", () => {
      addToyForm.style.display = addToyForm.style.display === "none" ? "block" : "none";
    });
  
    // Handle form submission to create a toy
    addToyForm.addEventListener("submit", (event) => {
      event.preventDefault();
      
      const toyName = nameInput.value.trim();
      const toyImage = imageInput.value.trim();
      
      if (toyName && toyImage) {
        // Create a new toy card
        const toyCard = document.createElement("div");
        toyCard.classList.add("toy-card");
  
        const toyImg = document.createElement("img");
        toyImg.src = toyImage;
        toyImg.alt = toyName;
        toyImg.classList.add("toy-image");
  
        const toyNameElement = document.createElement("h4");
        toyNameElement.textContent = toyName;
  
        toyCard.appendChild(toyImg);
        toyCard.appendChild(toyNameElement);
        toyCollectionDiv.appendChild(toyCard);
  
        // Clear the form inputs
        nameInput.value = "";
        imageInput.value = "";
      } else {
        alert("Please fill in both fields!");
      }
    });
  });
  