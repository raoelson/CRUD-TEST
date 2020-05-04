import model from "../models";

module.exports = {
    ListsProducts,
    registerProduct,
    deleteProduct,
    updateProduct,
    findBy
}
async function ListsProducts(req, res) {
    await model.Produit.findAll({order: [['id', 'DESC']]}).then(products =>
        res.status(201).json({
            'products': products
        })
    ).catch(err =>
        res.status(500).json({ 'error': 'cannot list products' })
    );
}

async function registerProduct(req, res){
    const { nom, prix, description } = req.body;
    if (nom == null || prix == null ) {
        return res.status(400).json({ 'error': 'missing parameters' });
    }
    const params = { 'nom': nom };
    const prdDate = await findProduct(['id'], params);
    if(prdDate) {
        return res.status(409).json({ 'error': 'name already exist' });
    } else {
        await model.Produit.create({
            nom: nom,
            prix: prix,
            description: description
        })
          .then((newProduct) => res.status(201).json({
            'newProduct': newProduct
        }))
          .catch((err) => res.status(500).json({
              'error': 'cannot add product'
        }));        
    }
}

async function deleteProduct(req, res){
    const { id } = req.params;
    if (id == null) {
        return res.status(400).json({ 'error': 'missing parameters' });
    }
    await model.Produit.destroy({
        where: { 'id': id }
    })
      .then(result => res.status(201).json({
        msg: result
    }))
      .catch(error => {
        res.status(409).json({msg: error.message});
    });
}

async function updateProduct(req, res){
    const { id } = req.params;
    const { nom, prix, description } = req.body;
    if (nom == null || prix == null ) {
        return res.status(400).json({ 'error': 'missing parameters' });
    }
    await model.Produit.update({
        nom: nom,
        prix: prix,
        description: description
    }, 
    {  where: { 'id': id } 
    })
        .then(result =>  res.status(201).json({
            'productId': result
        }))
        .catch(error => {
          res.status(412).json({msg: error.message});
        });
}

async function findBy(req, res) {
    const params = { 'id': req.params.id };
    const prodData = await findProduct(['id','nom','prix', 'description'], 
                                    params);
    res.status(201).json({
        'product': prodData
    })
}


function findProduct(attribut,params) {
    const data = model.Produit.findOne({
        attributes: attribut,
        where: params
    });
    return data;
}
