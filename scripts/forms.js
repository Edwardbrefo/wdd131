const now = new Date();
document.getElementById("currentyear").textContent = now.getFullYear();
const lastModified = new Date(document.lastModified);
document.getElementById("lastModified").textContent = `Last Updated: ${lastModified.toLocaleDateString()} ${lastModified.toLocaleTimeString()}`;

const products = [
  {
    id: "fc-1888",
    name: "flux capacitor",
    averagerating: 4.5
  },
  {
    id: "fc-2050",
    name: "power laces",
    averagerating: 4.7
  },
  {
    id: "fs-1987",
    name: "time circuits",
    averagerating: 3.5
  },
  {
    id: "ac-2000",
    name: "low voltage reactor",
    averagerating: 3.9
  },
  {
    id: "jj-1969",
    name: "warp equalizer",
    averagerating: 5.0
  }
];

// Populate product select from array
const productSelect = document.getElementById("productSelect");
products.forEach(product => {
    const option = document.createElement("option");
    option.value = product.id;
    option.textContent = product.name;
    productSelect.appendChild(option);
});

// STEP 1: Display how many reviews the user has already submitted
// localStorage is like a notepad that remembers information even after you close the browser
function displayReviewCount() {
    // Get the review count from localStorage (if nothing saved, use 0)
    const reviewCount = localStorage.getItem("reviewCount") || 0;
    
    // Find the paragraph element that shows the review count
    const reviewCountDisplay = document.getElementById("reviewCount");
    
    // If the element exists, show the message
    if (reviewCountDisplay) {
        reviewCountDisplay.textContent = `You have submitted ${reviewCount} reviews.`;
    }
}

// Run the displayReviewCount function when the page loads
displayReviewCount();

// STEP 2: Handle form submission when user clicks "Post Review"
const form = document.getElementById("reviewForm");
form.addEventListener("submit", function(event) {
    // Prevent the page from reloading
    event.preventDefault();
    
    // Get all the form data that the user entered
    const formData = new FormData(form);
    
    // Get all the checked features (there can be multiple)
    const selectedFeatures = Array.from(formData.getAll("features"));
    
    // Create a review object with all the information
    const review = {
        productId: formData.get("product"),           // Which product
        rating: formData.get("rating"),               // Star rating (1-5)
        installationDate: formData.get("dateInstall"), // When installed
        features: selectedFeatures,                    // What features they liked
        reviewText: formData.get("reviewText"),        // The written review
        fullName: formData.get("fullName"),            // Who wrote it
        timestamp: new Date().toISOString()            // When they submitted it
    };
    
    // STEP 3: Save the review to localStorage
    // Get all existing reviews (or start with empty list if none exist)
    let allReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    
    // Add the new review to the list
    allReviews.push(review);
    
    // Save the updated list back to localStorage
    localStorage.setItem("reviews", JSON.stringify(allReviews));
    
    // STEP 4: Update the review count
    // Get the current count from localStorage
    let reviewCount = localStorage.getItem("reviewCount") || 0;
    
    // Add 1 to the count
    reviewCount = parseInt(reviewCount) + 1;
    
    // Save the new count to localStorage
    localStorage.setItem("reviewCount", reviewCount);
    
    // STEP 5: Take the user to the review page to see all reviews
    window.location.href = "review.html";
});