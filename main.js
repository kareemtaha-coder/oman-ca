// Initialize AOS
AOS.init({
  duration: 800,
  easing: "ease-in-out",
  once: true,
});

// Car Data
const cars = [
  {
    id: 1,
    name: "Mercedes-Benz S-Class",
    price: "OMR 45,000",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e",
    category: "Luxury",
  },
  {
    id: 2,
    name: "Toyota Land Cruiser",
    price: "OMR 25,000",
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a",
    category: "SUV",
  },
  {
    id: 3,
    name: "Porsche 911",
    price: "OMR 55,000",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d",
    category: "Sports",
  },
  // Add more cars as needed
];

// Populate Cars Grid on Cars Page
if (window.location.pathname.includes("cars.html")) {
  const carGrid = document.querySelector(".car-grid");
  cars.forEach((car) => {
    const carCard = document.createElement("div");
    carCard.className = "car-card";
    carCard.setAttribute("data-aos", "fade-up");
    carCard.innerHTML = `
            <img src="${car.image}" alt="${car.name}">
            <div class="car-info">
                <h3>${car.name}</h3>
                <p>Starting from ${car.price}</p>
                <p>Category: ${car.category}</p>
                <a href="#" class="btn">View Details</a>
            </div>
        `;
    carGrid.appendChild(carCard);
  });
}

// Form Validation
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    if (!name || !email || !subject || !message) {
      alert("Please fill in all fields");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Here you would typically send the form data to a server
    alert("Thank you for your message! We will get back to you soon.");
    contactForm.reset();
  });
}

// Email validation helper function
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Search functionality
const searchForm = document.querySelector(".search-form");
if (searchForm) {
  searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const searchTerm = searchForm.querySelector("input").value.toLowerCase();

    // Filter cars based on search term
    const filteredCars = cars.filter(
      (car) =>
        car.name.toLowerCase().includes(searchTerm) ||
        car.category.toLowerCase().includes(searchTerm)
    );

    // Redirect to cars page with search results
    window.location.href = `/cars.html?search=${encodeURIComponent(
      searchTerm
    )}`;
  });
}
