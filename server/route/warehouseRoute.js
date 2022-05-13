//use Router feature
const express = require('express');
const router = express.Router();

//import model
const Warehouse = require('../model/warehouseModel');

//create CRUD operation for item
//create item
router.post('/warehouse', async (req, res) => {
	try {
		const newWarehouse = await Warehouse.create(req.body);
		newWarehouse.save();
		res.status(201).json({
			message: 'Warehouse created successfully',
		});
	} catch (error) {
		res.status(400).send(error);
	}
});

//get all items
router.get('/warehouse', async (req, res) => {
	try {
		const allWarehouses = await Warehouse.find();
		res.send(allWarehouses);
	} catch (error) {
		res.status(400).send(error);
	}
});

//get item by id
router.get('/warehouse/:id', async (req, res) => {
	try {
		const item = await Warehouse.findById(req.params.id);
		res.send(item);
	} catch (error) {
		res.status(400).send(error);
	}
});

//export router
module.exports = router;
