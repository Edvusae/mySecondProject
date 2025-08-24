// Slider Initialization
document.addEventListener('DOMContentLoaded', () => {

    // --- Hero Section Slider Logic ---
    const heroSlides = document.querySelectorAll('.hero-slide');
    const prevSlideButton = document.querySelector('.prev-slide');
    const nextSlideButton = document.querySelector('.next-slide');
    const sliderDotsContainer = document.querySelector('.slider-dots');

    // Initialize slider state
    let currentSlideIndex = 0;
    let isSliding = false; // New state variable
    let autoSlideIntervalId = null; // Renamed for clarity

    // Function to display a specific slide
    function displaySlide(index) {
        // Ensure index wraps around for infinite looping
        if (index >= heroSlides.length) {
            currentSlideIndex = 0;
        } else if (index < 0) {
            currentSlideIndex = heroSlides.length - 1;
        } else {
            currentSlideIndex = index;
        }

        // Update sliding state
        heroSlides.forEach((slide, i) => {
            slide.classList.remove('active'); // Remove 'active' from all slides
            if (i === currentSlideIndex) {
                slide.classList.add('active'); // Add 'active' to the current slide
            }
        });
        updateSliderDots(currentSlideIndex); // Update corresponding dot
    }

    // Function to advance to the next slide
    function goToNextSlide() {
        displaySlide(currentSlideIndex + 1);
        resetAutoSlide(); // Reset timer on manual or auto advance
    }

    // Function to go back to the previous slide
    function goToPrevSlide() {
        resetAutoSlide(); // Reset timer on manual advance
        displaySlide(currentSlideIndex - 1);
    }

    // Function to create slider navigation dots
    function createSliderDots() {
        sliderDotsContainer.innerHTML = ''; // Clear any existing dots
        heroSlides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.addEventListener('click', () => {
                displaySlide(index); // Go to slide corresponding to the clicked dot
                resetAutoSlide(); // Reset timer
            });
            sliderDotsContainer.appendChild(dot);
        });
        updateSliderDots(currentSlideIndex); // Set initial active dot
    }

    // Function to update the active state of slider dots
    function updateSliderDots(index) {
        document.querySelectorAll('.dot').forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Function to start automatic sliding
    function startAutoSlide() {
        // Clear any existing interval before starting a new one
        if (autoSlideIntervalId) {
            clearInterval(autoSlideIntervalId);
        }
        autoSlideIntervalId = setInterval(goToNextSlide, 5000); // Change slide every 5 seconds
    }

    // Function to reset the auto-slide timer
    function resetAutoSlide() {
        clearInterval(autoSlideIntervalId);
        startAutoSlide();
    }

    // Event Listeners for slider navigation buttons
    if (prevSlideButton) {
        prevSlideButton.addEventListener('click', goToPrevSlide);
    }
    if (nextSlideButton) {
        nextSlideButton.addEventListener('click', goToNextSlide);
    }

    // Initialize slider on page load
    if (heroSlides.length > 0) {
        displaySlide(currentSlideIndex); // Show the first slide initially
        createSliderDots(); // Create dots based on number of slides
        startAutoSlide(); // Start automatic sliding
    }

    // --- Gallery Section Logic ---
    const imageUpload = document.getElementById('imageUpload');
    const galleryGrid = document.getElementById('galleryGrid');
    const uploadArea = document.querySelector('.upload-area'); // Get the upload area

    // Load images from Local Storage, or initialize an empty array
    let images = JSON.parse(localStorage.getItem('galleryImages')) || [];

    // Function to render images in the gallery
    function renderGalleryImages() {
        galleryGrid.innerHTML = ''; // Clear existing images before re-rendering

        if (images.length === 0) {
            // Optional: Display a message if no images are uploaded
            galleryGrid.innerHTML = '<p class="no-images-message">No images uploaded yet. Drag & drop or click "Upload Images" to add some!</p>';
            return;
        }

        images.forEach((imgSrc, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.classList.add('gallery-item');

            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = `Gallery Image ${index + 1}`;
            img.loading = 'lazy'; // Improve performance by lazy-loading images

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                deleteGalleryImage(index);
            });

            galleryItem.appendChild(img);
            galleryItem.appendChild(deleteButton);
            galleryGrid.appendChild(galleryItem);
        });
    }

    // Function to add a new image to the gallery
    function addGalleryImage(imageData) {
        images.push(imageData);
        localStorage.setItem('galleryImages', JSON.stringify(images)); // Save to local storage
        renderGalleryImages(); // Re-render gallery
    }

    // Function to delete an image from the gallery
    function deleteGalleryImage(index) {
        images.splice(index, 1); // Remove image at the specified index
        localStorage.setItem('galleryImages', JSON.stringify(images)); // Update local storage
        renderGalleryImages(); // Re-render gallery
    }

    // Helper function to process files (for both input and drag/drop)
    function processFiles(files) {
        if (files.length > 0) {
            Array.from(files).forEach(file => {
                if (file.type.startsWith('image/')) { // Only process image files
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        addGalleryImage(e.target.result); // Add base64 string
                    };
                    reader.readAsDataURL(file); // Convert image to base64
                }
            });
        }
    }

    // Event Listener for file input change
    if (imageUpload) {
        imageUpload.addEventListener('change', (event) => {
            processFiles(event.target.files);
        });
    }

    // Event Listeners for drag and drop functionality
    if (uploadArea) {
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault(); // Prevent default drag behavior
            uploadArea.style.borderColor = '#007bff'; // Visual feedback on drag
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.style.borderColor = '#ccc'; // Reset border color
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault(); // Prevent default drop behavior
            uploadArea.style.borderColor = '#ccc'; // Reset border color
            processFiles(e.dataTransfer.files); // Process dropped files
        });
    }

    // Initial render of gallery images when the page loads
    renderGalleryImages();
});