import { Router, Request, Response } from 'express';
import { FeedItem } from '../models/FeedItem';
import { NextFunction } from 'connect';
import * as jwt from 'jsonwebtoken';
import * as AWS from '../../../../aws';
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
        return res.status(500).send({ auth: false, message: 'Failed to authenticate.', error: err });
    }
    return next();
    });
}  

// Get all feed items
router.get('/', async (req: Request, res: Response) => {
    const items = await FeedItem.findAndCountAll({order: [['id', 'DESC']]});
    items.rows.map((item) => {
            if(item.url) {
                item.url = AWS.getGetSignedUrl(item.url);
            }
    });
    res.send(items);
});

// Get a specific resource
router.get('/:id', 
    async (req: Request, res: Response) => {
    let { id } = req.params;
    const item = await FeedItem.findByPk(id);
    res.send(item);
});

// update a specific resource
router.patch('/:id', 
    requireAuth,
    async (req: Request, res: Response) => {
        let { id } = req.params;
        const quantity = req.body.quantity;

        const item = await FeedItem.findByPk(id);
        item.quantity += quantity;
        
        const saved_item = await item.save();

        res.status(201).send(saved_item);
});

// Delete a specific resource
router.delete('/:id',
    requireAuth,
    async (req: Request, res: Response) => {
    let { id } = req.params;
    const order = await FeedItem.findByPk(id);

    order.destroy()
    res.status(201).send();
});


// Get a signed url to put a new item in the bucket
router.get('/signed-url/:fileName',
    requireAuth, 
    async (req: Request, res: Response) => {
    let { fileName } = req.params;
    const url = AWS.getPutSignedUrl(fileName);
    res.status(201).send({url: url});
});

// Post meta data and the filename after a file is uploaded 
// NOTE the file name is they key name in the s3 bucket.
// body : {name: string, fileName: string};
router.post('/', 
    requireAuth, 
    async (req: Request, res: Response) => {
    const name = req.body.name;
    const fileName = req.body.url;
    const quantity = req.body.quantity;

    // check name is valid
    if (!name) {
        return res.status(400).send({ message: 'Name is required or malformed' });
    }

    // check Filename is valid
    if (!fileName) {
        return res.status(400).send({ message: 'File url is required' });
    }

    // check quantity is valid
    if (!quantity) {
        return res.status(400).send({ message: 'Quantity is required' });
    }

    const item = await new FeedItem({
            name: name,
            url: fileName,
            quantity: quantity
    });

    const saved_item = await item.save();

    saved_item.url = AWS.getGetSignedUrl(saved_item.url);
    res.status(201).send(saved_item);
});

export const FeedRouter: Router = router;