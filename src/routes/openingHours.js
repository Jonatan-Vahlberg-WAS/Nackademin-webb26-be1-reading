import { Router } from 'express';

const router = Router();

router.get("/", (req, res) => {
    res.status(200).json({
        weekday: '07:00 - 17:00',
        saturday: '08:00 - 15:00',
        sunday: 'Closed',
    });
});

export default router;