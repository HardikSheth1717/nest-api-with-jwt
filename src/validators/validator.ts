export default class Validator {
    constructor() {

    }

    static getPropertyName = (property: Object) => Object.keys(property)[0];

    static isValidInteger = (expression: string) => {
        return Number.isInteger(expression);
    }

    static isValidDecimal = (expression: string) => {
        if (expression && Number.isNaN(expression)) {
            const regex = /^[-+]?[0-9]+\.[0-9]+$/;
            return expression.match(regex);
        }

        return false;
    }

    static isNumber = (expression: string) => {
        return /^-?[\d.]+(?:e-?\d+)?$/.test(expression);
    }

    static isNumeric = (expression: number) => {
        return !isNaN(expression)
    }

    static EmailValidation = (email: string) => {
        const mail_format = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
        return mail_format.test(email);
    }

    static StringValidator = (
        fieldName: string, expression: string, required: boolean, type: string,
        minLength?: number, maxLength?: number
    ) => {
        const errorMessage = [];

        if (required && !(expression.toString() && expression.toString().trim().length > 0))
            errorMessage.push(`${fieldName} is required.`);

        if (!type || type === 'text') {
            if (
                (minLength && minLength > 0 && !(expression && expression.toString().trim().length >= minLength)) ||
                (maxLength && maxLength > 0 && !(expression && expression.toString().trim().length <= maxLength))
            )
                errorMessage.push(`${fieldName} must be between ${minLength} to ${maxLength} characters.`);
        } else if (type === 'email') {
            if (!Validator.EmailValidation(expression))
               errorMessage.push(`${fieldName} is not a valid email address.`);
        }

        return errorMessage;
    }

    static NumberValidator = (
        fieldName: string, expression: string, required: boolean, minLength?: number, maxLength?: number
    ) => {
        const errorMessage = [];

        if (required && !(expression && parseFloat(expression) > 0))
            errorMessage.push(`${fieldName} is required.`);

        if (
            (minLength && minLength > 0 && !(expression && parseFloat(expression) >= minLength)) ||
            (maxLength && maxLength > 0 && !(expression && parseFloat(expression) <= maxLength))
        )
            errorMessage.push(`${fieldName} must be between ${minLength} to ${maxLength}.`);

        return errorMessage;
    }
}