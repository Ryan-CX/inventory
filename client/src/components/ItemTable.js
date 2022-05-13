import React, { useState, useEffect } from 'react';
import EditItem from './EditItem';
const axios = require('axios');

const ItemTable = () => {
	const [items, setItems] = useState([]);
	const [warehouseList, setWarehouseList] = useState([]);
	const [assignedWarehouse, setAssignedWarehouse] = useState('');

	const getWarehouseList = async () => {
		try {
			const response = await axios.get('http://localhost:5000/warehouse');

			setWarehouseList(response.data);
		} catch (error) {
			console.error(error.message);
		}
	};

	//get request to get all items
	const getItems = async () => {
		try {
			const response = await axios.get('http://localhost:5000/items');
			setItems(response.data);
		} catch (error) {
			console.error(error.message);
		}
	};

	//delete request to delete item, and add deleted item to deleteItems array
	const deleteItem = async (id) => {
		try {
			const response = await axios.delete(`http://localhost:5000/items/${id}`);

			getItems();
		} catch (error) {
			console.error(error.message);
		}
	};

	const handleChange = (event) => {
		setAssignedWarehouse(event.target.value);
	};

	//get all items on mount
	useEffect(() => {
		getItems();
		getWarehouseList();
	}, []);

	return (
		<>
			<div className='table'>
				<h3>Inventory Table</h3>

				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Description</th>
							<th>Price</th>
							<th>Quantity</th>
							<th>Edit</th>
							<th>Delete</th>
							<th>Warehouse</th>
							<th>Current Warehouse</th>
						</tr>
					</thead>
					<tbody>
						{items.map((item) => (
							<tr key={item._id}>
								<td>{item.name}</td>
								<td>{item.description}</td>
								<td>${item.price}</td>
								<td>{item.quantity}</td>
								<td>
									<EditItem item={item} />
								</td>

								<td>
									<button onClick={() => deleteItem(item._id)}>Delete</button>
								</td>
								<td>
									<p>{item.warehouse}</p>
									<form
										onSubmit={(event) => {
											event.preventDefault();
											axios
												.put(`http://localhost:5000/items/${item._id}`, {
													warehouse: assignedWarehouse,
												})
												.then(() => {
													getItems();
												})
												.catch((error) => {
													console.error(error.message);
												});
										}}
									>
										<select onChange={handleChange}>
											<option defaultValue={null}>Select Warehouse</option>
											{warehouseList.map((warehouse) => (
												<option key={warehouse._id} value={warehouse.location}>
													{warehouse.location}
												</option>
											))}
										</select>
										<input type='submit' value='Submit' />
									</form>
								</td>
								<td>
									{item.warehouse ? (
										<p>{item.warehouse}</p>
									) : (
										<p>No warehouse assigned</p>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default ItemTable;
