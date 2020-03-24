import { Router, Request, Response } from 'express';
import { Order } from '../models/Order';
import { NextFunction } from 'connect';
import * as jwt from 'jsonwebtoken';
import * as c from '../../../../config/config';

const router: Router = Router();

export function requireAuth(req: Request, res: Response, next: NextFunction) {
    
    if (!req.headers || !req.headers.authorization){
        return res.status(401).send({ message: 'No authorization headers.' });
    }
    

    const token_bearer = req.headers.authorization.split(' ');
    if(token_bearer.length != 2){
        return res.status(401).send({ message: 'Malformed token.' });
    }
    
    const token = token_bearer[1];
    return jwt.verify(token, c.config.jwt.secret , (err, decoded) => {
    if (err) {
        return res.status(500).send({ auth: false, message: 'Failed to authenticate.' });
    }
    return next();
    });
}

// Get all orders
router.get('/',
    requireAuth,
    async (req: Request, res: Response) => {
    const orders = await Order.findAndCountAll({order: [['id', 'DESC']]});

    res.send(orders);
});

// Get a specific resource
router.get('/:id',
    requireAuth,
    async (req: Request, res: Response) => {
    let { id } = req.params;
    const order = await Order.findByPk(id);
    res.send(order);
});

// update a specific resource
router.patch('/:id', 
    requireAuth,
    async (req: Request, res: Response) => {
        
    let { id } = req.params;
    const state = req.body.state;

    const order = await Order.findByPk(id);
    order.state = state;

    const saved_order = await order.save();

    res.status(201).send(saved_order);
});

// Delete a specific resource
router.delete('/:id',
    requireAuth,
    async (req: Request, res: Response) => {
    let { id } = req.params;
    const order = await Order.findByPk(id);

    order.destroy()
    res.status(201).send();
});


// body : {item: string, client: string};
router.post('/',
    async (req: Request, res: Response) => {
    const item = req.body.item;
    const client = req.body.client;

    // check Caption is valid
    if (!item) {
        return res.status(400).send({ message: 'Item id is required or malformed' });
    }

    // check Filename is valid
    if (!client) {
        return res.status(400).send({ message: 'Client email is required' });
    }

    const order = await new Order({
            item: item,
            client: client
    });

    const saved_order = await order.save();

    res.status(201).send(saved_order);
});

export const OrderRouter: Router = router;