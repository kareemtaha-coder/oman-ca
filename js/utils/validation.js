// Input validation utilities
export const validators = {
    required: (value) => value.trim() !== '',
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    phone: (value) => /^(\+968|968)?[279]\d{7}$/.test(value), // Oman phone format
    price: (value) => !isNaN(value) && value >= 0,
    year: (value) => {
        const year = parseInt(value);
        const currentYear = new Date().getFullYear();
        return year >= 1900 && year <= currentYear + 1;
    }
};

export const validateField = (value, rules) => {
    const errors = [];
    for (const [rule, message] of Object.entries(rules)) {
        if (!validators[rule](value)) {
            errors.push(message);
        }
    }
    return errors;
};