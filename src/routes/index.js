import { Router } from 'express';
import { ListsProducts, registerProduct,
        deleteProduct, updateProduct,
        findBy } from '../controllers/produits.controllers';
import { login } from '../controllers/users.controllers';
const router = Router();

router.get('/', ListsProducts);
router.post('/', registerProduct);
router.delete('/:id', deleteProduct);
router.put('/:id', updateProduct);
router.get('/:id/edit', findBy);



router.post('/login', login);

export default router;