import { Router, Request, Response } from 'express';
import { OrderRouter } from './order/routes/order.router';

const router: Router = Router();

router.use('/order', OrderRouter);

router.get('/', async (req: Request, res: Response) => {    
    res.send(`V0`);
});

export const IndexRouter: Router = router;