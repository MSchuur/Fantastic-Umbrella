const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryGet = await Category.findAll({
      include: [{ model: Product,
                  }],
    });
    res.status(200).json(categoryGet);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryGetOne = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryGetOne) {
      res.status(404).json({message: 'No category found with that id!'});
      return;
    }

    res.status(200).json(categoryGetOne);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const categoryCreate = await Category.create(req.body);
    res.status(200).json(categoryCreate);
  } catch (err) {
    res.status(400),json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const categoryUpdate = await Category.update(req.body, {
      individualHooks: true,
      where: {
        id: req.params.id
      },
    });
    
    if(!categoryUpdate) {
      res.status(404).json({message: 'No category found with that id!'});
      return;
    }
    res.status(200).json(categoryUpdate);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if(!categoryData) {
      res.status(404).json({message: 'No category found with that id!'});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
