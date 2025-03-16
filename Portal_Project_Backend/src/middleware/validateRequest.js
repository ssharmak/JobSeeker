const { validationResult, body, query, param } = require("express-validator");

const validateRequest = (validations) => {
    return async (req, res, next) => {
        // Run all validation rules
        await Promise.all(validations.map((validation) => validation.run(req)));

        // Collect validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Proceed to next middleware/controller
        next();
    };
};

module.exports={ validateRequest }
