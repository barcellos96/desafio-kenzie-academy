"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateUserCreateMiddleware = (req, res, next) => {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone) {
        return res.status(400).json({
            message: "fill in all fields",
            fields_fill: {
                name: req.body.name || "Campo obrigatório",
                email: req.body.email || "Campo obrigatório",
                password: req.body.password || "Campo obrigatório",
                phone: req.body.phone || "Campo obrigatório",
            },
        });
    }
    next();
};
exports.default = validateUserCreateMiddleware;
