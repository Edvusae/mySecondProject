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