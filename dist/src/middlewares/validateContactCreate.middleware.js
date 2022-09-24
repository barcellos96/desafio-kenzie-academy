"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateContactCreateMiddleware = (req, res, next) => {
    const { name, email, contact } = req.body;
    if (!name || !email || !contact) {
        return res.status(400).json({
            message: "fill in all fields",
            fields_fill: {
                name: req.body.name || "Campo obrigatório",
                email: req.body.email || "Campo obrigatório",
                contact: req.body.contact || "Campo obrigatório",
            },
        });
    }
    next();
};
exports.default = validateContactCreateMiddleware;
