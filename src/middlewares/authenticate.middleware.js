import jwt from 'jsonwebtoken';
import 'dotenv/config';
import logger from '../logs/loger.js';

export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.sendStatus(401); // No hay token, retorna 401 Unauthorized
    }

    const token = authHeader.split(' ')[1]; // Obtiene el token desde el header

    if (!token) {
        return res.sendStatus(401); // No se encontró el token, retorna 401 Unauthorized
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            logger.error('Error al verificar el token:', err.message);
            return res.sendStatus(403); // Error de verificación, retorna 403 Forbidden
        }

        // El token es válido, el objeto `decoded` contiene el payload decodificado
        req.user = decoded; // Asigna el payload decodificado a req.user
        console.log('Este es mi token decodificado:', decoded);
        next(); // Continúa con el siguiente middleware o controlador
    });
}
