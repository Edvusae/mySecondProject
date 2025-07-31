//Image Slides
const slides = document.querySelectorAll(".slides img");
let slideIndex = 0;
let IntervalId = null;

//Initializesslider();
document.addEventListener("DOMContentLoaded", initializeslider);
function initializeslider(){
    if(slides.length > 0){
        slides[slideIndex].classList.add("displaySlide");
        IntervalId = setInterval(nextSlide,5000);
    }
    
}
function showslide(index){
    if(index >= slides.length){
    slideIndex = 0;
}else{
    slideIndex = slides.length - 1;
}
    slides.forEach(slide => {
        slide.classList.remove("displaySlide");
    });
    slides[slideIndex].classList.add("displaySlide");
}
function prevSlide(){
    clearInterval(IntervalId);
    slideIndex--;
    showslide(slideIndex);
}
function nextSlide(){
    slideIndex++;
    showslide(slideIndex);
}

document.addEventListener('DOMContentLoaded', () => {
    const imageUpload = document.getElementById('imageUpload');
    const galleryGrid = document.getElementById('galleryGrid');
    let images = JSON.parse(localStorage.getItem('galleryImages')) || [];

    // Function to render images
    function renderImages() {
        galleryGrid.innerHTML = ''; // Clear existing images
        images.forEach((imgSrc, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.classList.add('gallery-item');

            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = `Gallery Image ${index + 1}`;

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                deleteImage(index);
            });

            galleryItem.appendChild(img);
            galleryItem.appendChild(deleteButton);
            galleryGrid.appendChild(galleryItem);
        });
    }

    // Function to add a new image
    function addImage(imageData) {
        images.push(imageData);
        localStorage.setItem('galleryImages', JSON.stringify(images));
        renderImages();
    }

    // Function to delete an image
    function deleteImage(index) {
        images.splice(index, 1); // Remove image at specific index
        localStorage.setItem('galleryImages', JSON.stringify(images));
        renderImages();
    }

    // Handle file input change
    imageUpload.addEventListener('change', (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            Array.from(files).forEach(file => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    addImage(e.target.result); // Add base64 string to array
                };
                reader.readAsDataURL(file); // Convert image to base64
            });
        }
    });

    // Handle drag and drop
    const uploadArea = document.querySelector('.upload-area');
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault(); // Prevent default drag behavior
        uploadArea.style.borderColor = '#007bff';
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = '#ccc';
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault(); // Prevent default drop behavior
        uploadArea.style.borderColor = '#ccc';
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            Array.from(files).forEach(file => {
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        addImage(event.target.result);
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
    });

    // Initial render of images on page load
    renderImages();
});