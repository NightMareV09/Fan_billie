document.addEventListener("DOMContentLoaded", () => {
  // Handle Fan Art Gallery Fetch
  const galleryGrid = document.querySelector(".gallery-grid");

  // Fetch gallery data (list of images)
  async function loadGallery() {
    try {
      const response = await fetch("get-uploads.php"); // Server script to list images
      const images = await response.json();

      images.forEach((image) => {
        const item = document.createElement("div");
        item.classList.add("gallery-item");
        item.innerHTML = `
          <img src="${image.path}" alt="Fan Art">
          <p>${image.caption || "No caption available"}</p>
        `;
        galleryGrid.appendChild(item);
      });
    } catch (error) {
      console.error("Error fetching gallery images:", error);
    }
  }

  loadGallery(); // Call to load the gallery images when page loads

  // Handle Comment Submission
  const commentForm = document.getElementById("comment-form");
  const commentList = document.getElementById("comment-list");

  commentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const commentInput = document.getElementById("comment-input");
    const newComment = document.createElement("p");
    newComment.innerHTML = `<strong>@guest:</strong> ${commentInput.value}`;
    commentList.appendChild(newComment);
    commentInput.value = ""; // Clear input
  });

  // Handle Fan Art Submission
  const uploadForm = document.getElementById("upload-form");

  uploadForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(uploadForm); // Collect file and caption

    try {
      const response = await fetch("upload.php", { // Replace with your server URL
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Fan art uploaded successfully!");
        location.reload(); // Reload to show the new upload
      } else {
        alert("Failed to upload fan art. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading fan art:", error);
      alert("An error occurred. Please check your connection.");
    }
  });
});