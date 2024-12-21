import { validateField } from '../utils/validation.js';
import { carService } from '../services/carService.js';

export class CarForm {
    constructor(formId, onSubmit) {
        this.form = document.getElementById(formId);
        this.onSubmit = onSubmit;
        this.setupForm();
    }

    setupForm() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (this.validateForm()) {
                const formData = new FormData(this.form);
                const carData = Object.fromEntries(formData.entries());
                this.onSubmit(carData);
                this.form.reset();
            }
        });

        // Real-time validation
        this.form.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
        });
    }

    validateField(input) {
        const rules = {
            name: { required: 'Name is required' },
            price: { required: 'Price is required', price: 'Invalid price' },
            year: { required: 'Year is required', year: 'Invalid year' },
            category: { required: 'Category is required' }
        };

        const fieldRules = rules[input.name];
        if (fieldRules) {
            const errors = validateField(input.value, fieldRules);
            this.showFieldErrors(input, errors);
            return errors.length === 0;
        }
        return true;
    }

    validateForm() {
        let isValid = true;
        this.form.querySelectorAll('input, textarea').forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        return isValid;
    }

    showFieldErrors(input, errors) {
        const errorDiv = input.nextElementSibling;
        if (errorDiv && errorDiv.classList.contains('error-message')) {
            errorDiv.textContent = errors.join(', ');
            input.classList.toggle('invalid', errors.length > 0);
        }
    }
}