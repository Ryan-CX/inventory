//use Router feature
const express = require('express');
const router = express.Router();

//import model
const Item = require('../model/items');

//create CRUD operation for item
//create item
router.post('/items', async (req, res) => {
	try {
		const newItem = await Item.create(req.body);
		newItem.save();
		res.status(201).json({
			message: 'Item created successfully',
		});
	} catch (error) {
		res.status(400).send(error);
	}
});

//get all items
router.get('/items', async (req, res) => {
	try {
		const allItems = await Item.find();
		res.send(allItems);
	} catch (error) {
		res.status(400).send(error);
	}
});

//get item by id
router.get('/items/:id', async (req, res) => {
	try {
		const item = await Item.findById(req.params.id);
		res.send(item);
	} catch (error) {
		res.status(400).send(error);
	}
});

//update item by id

router.put('/items/:id', async (req, res) => {
	try {
		const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		res.send(updatedItem);
	} catch (error) {
		res.status(400).send(error);
	}
});

//delete item by id

router.delete('/items/:id', async (req, res) => {
	try {
		const deletedItem = await Item.findByIdAndDelete(req.params.id);
		res.send(deletedItem);
	} catch (error) {
		res.status(400).send(error);
	}
});

//export router
module.exports = router;
