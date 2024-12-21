import { carService } from '../services/carService.js';

export class CarList {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.setupList();
    }

    setupList() {
        this.renderCars();
        this.setupSearch();
        this.setupFilters();
    }

    renderCars(cars = carService.getAllCars()) {
        this.container.innerHTML = '';
        cars.forEach(car => {
            const carElement = this.createCarElement(car);
            this.container.appendChild(carElement);
        });
    }

    createCarElement(car) {
        const div = document.createElement('div');
        div.className = 'car-card animate-fade-in';
        div.innerHTML = `
            <div class="car-image">
                <img src="${car.image}" alt="${car.name}">
                <span class="car-category">${car.category}</span>
            </div>
            <div class="car-info">
                <h3 class="car-title">${car.name}</h3>
                <div class="car-price">OMR ${car.price.toLocaleString()}</div>
                <div class="car-details">
                    <div class="car-detail-item">
                        <i class="fas fa-calendar"></i>
                        <span>${car.year}</span>
                    </div>
                </div>
                <div class="car-actions">
                    <button class="car-btn btn-primary" onclick="editCar(${car.id})">Edit</button>
                    <button class="car-btn btn-secondary" onclick="deleteCar(${car.id})">Delete</button>
                </div>
            </div>
        `;
        return div;
    }

    setupSearch() {
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value;
                const filteredCars = carService.searchCars(query);
                this.renderCars(filteredCars);
            });
        }
    }

    setupFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.dataset.category;
                const cars = carService.getAllCars();
                const filteredCars = category === 'all' 
                    ? cars 
                    : cars.filter(car => car.category === category);
                this.renderCars(filteredCars);
            });
        });
    }
}