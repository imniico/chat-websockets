import { Router } from 'express';

const router = Router();
// router.use(...)

router.get("/", (req, res) => {
    res.render("home");
})

export default router;