import express from 'express';
import { createReservation, getUserReservations } from '../controllers/reservation.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

// Allow guests to create reservations, but protect getting user reservations
// We'll need a way to differentiate. Or just make create public and get protected.
// For now, allow create as public.
router.post('/', async (req, res, next) => {
    // Optional auth middleware integration if token present?
    // For simplicity, handle it in controller or use a "soft" auth middleware.
    // Let's just use standard controller logic which checks req.user (set by optional auth middleware).
    // Express doesn't have "optional" middleware easily without custom code.
    // We'll assume public access for creation.
    // To attach user if present, we can check header manually in controller or use a lenient middleware.
    // Let's stick to public for now.
    next();
}, createReservation);

// Note: If we want to link user -> reservation, we need to extract token if present.
// Let's rely on the frontend sending headers and us using a lenient middleware if needed.
// For now, let's keep it simple. If we need to support logged-in assignment, we can add logic in controller to parse token manually if header exists.

router.get('/', authenticate, getUserReservations);

export default router;
