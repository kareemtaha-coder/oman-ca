import { storage } from '../utils/storage.js';

const CARS_KEY = 'oman_cars';

class CarService {
    constructor() {
        this.initializeData();
    }

    initializeData() {
        if (!storage.get(CARS_KEY)) {
            storage.set(CARS_KEY, [
                {
                    id: 1,
                    name: 'Mercedes-Benz S-Class',
                    price: 45000,
                    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e',
                    category: 'Luxury',
                    year: 2024,
                    description: 'Luxury sedan with advanced features'
                },
                // ... other initial cars
            ]);
        }
    }

    getAllCars() {
        return storage.get(CARS_KEY) || [];
    }

    getCarById(id) {
        const cars = this.getAllCars();
        return cars.find(car => car.id === id);
    }

    addCar(car) {
        const cars = this.getAllCars();
        const newCar = {
            ...car,
            id: Date.now(),
        };
        cars.push(newCar);
        storage.set(CARS_KEY, cars);
        return newCar;
    }

    updateCar(id, updatedCar) {
        const cars = this.getAllCars();
        const index = cars.findIndex(car => car.id === id);
        if (index !== -1) {
            cars[index] = { ...cars[index], ...updatedCar };
            storage.set(CARS_KEY, cars);
            return cars[index];
        }
        return null;
    }

    deleteCar(id) {
        const cars = this.getAllCars();
        const filteredCars = cars.filter(car => car.id !== id);
        storage.set(CARS_KEY, filteredCars);
    }

    searchCars(query) {
        const cars = this.getAllCars();
        const searchTerm = query.toLowerCase();
        return cars.filter(car => 
            car.name.toLowerCase().includes(searchTerm) ||
            car.category.toLowerCase().includes(searchTerm) ||
            car.description.toLowerCase().includes(searchTerm)
        );
    }
}

export const carService = new CarService();