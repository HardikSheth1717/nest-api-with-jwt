import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ValidationException } from '../exceptions/validation.exception';

@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter {
    catch(exception: ValidationException, host: ArgumentsHost): any {
        const propertyList = exception.validationErrors.map(x => x.property);
        
        let errors = {};

        propertyList.forEach(property => {
            const exceptionObj = exception.validationErrors.find(x => x.property === property);

            if (exceptionObj) {
                errors[property] = Object.values(exceptionObj.constraints);
            }
        });

        const context = host.switchToHttp();
        const response = context.getResponse();

        return response.status(400).json({
            statusCode: 400,
            status: false,
            errors: errors
        });
    }

}