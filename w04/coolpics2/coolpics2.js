// Menu button toggle
const menuButton = document.querySelector('#menu-button');

function toggleMenu() {
    const menuItems = document.querySelector('#menu-items');
    menuItems.classList.toggle("hide"); 
}

menuButton.addEventListener('click', toggleMenu);

// Resize handling for menu visibility
function handleResize() {
    const menu = document.querySelector("#menu-items");
    if (window.innerWidth > 1000) {
      menu.classList.remove("hide");
    } else {
      menu.classList.add("hide");
    }
}

handleResize();
window.addEventListener("resize", handleResize);

// Modal functionality
const closeModalButton = document.querySelector('.close-viewer');

function openModal(imageSrc) {
    // Check if modal exists; if not, insert it
    const existingModal = document.querySelector('.viewer');
    if (!existingModal) {
        document.body.insertAdjacentHTML('afterbegin', viewerTemplate(imageSrc, "Image"));
    } else {
        const modalImage = document.querySelector('#modal-image');
        modalImage.src = imageSrc; // Change the modal image source
        existingModal.classList.remove('hide'); // Show modal
    }
}

function closeModal() {
    const modal = document.querySelector('.viewer');
    if (modal) {
        modal.classList.add('hide'); // Hide the modal by adding the "hide" class
    }
}

closeModalButton.addEventListener('click', closeModal);


const galleryImages = document.querySelectorAll('.gallery-image'); 

// Loop through images and attach click event to each
galleryImages.forEach(image => {
    image.addEventListener('click', function() {
        openModal(image.src); // Pass the clicked image's src to openModal
    });
});

// Function to create modal HTML dynamically
function viewerTemplate(imageSrc, altText) {
  return `
    <div class="viewer">
      <button class="close-viewer">X</button>
      <img id="modal-image" src="${imageSrc}" alt="${altText}">
    </div>
  `;
}

// Event handler to open modal when an image is clicked
function viewHandler(event) {
  // Ensure only image elements trigger the modal
  if (event.target.tagName === 'IMG') {
    const clickedImage = event.target;

    // Extract and modify the image src to load the full-size version
    const imageSrcParts = clickedImage.src.split('-');
    const fullImageSrc = imageSrcParts[0] + '-full.jpeg'; 

    // Get alt text of the clicked image
    const altText = clickedImage.alt;

    // Insert modal HTML into the body
    document.body.insertAdjacentHTML('afterbegin', viewerTemplate(fullImageSrc, altText));

    // Add event listener to close button
    const closeButton = document.querySelector('.close-viewer');
    closeButton.addEventListener('click', closeViewer);
  }
}

// Function to close and remove modal from DOM
function closeViewer() {
  const viewer = document.querySelector('.viewer');
  if (viewer) {
    viewer.remove();
  }
}

// Add event listener to the gallery section for image clicks
const gallerySection = document.querySelector('.gallery');
gallerySection.addEventListener('click', viewHandler);
