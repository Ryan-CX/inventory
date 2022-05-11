import React, { useState, useEffect } from 'react';
import EditItem from './EditItem';
const axios = require('axios');

const ItemTable = () => {
	const [items, setItems] = useState([]);
	const [itemsToShip, setItemsToShip] = useState([]);

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

	//get all items on mount
	useEffect(() => {
		getItems();
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
							<th>Add to shipment</th>
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
									{/* use + and - to adjust itemstoship and item's quantity dynamically*/}
									<button
										onClick={() => {
											if (item.toship > 0) {
												setItemsToShip(
													itemsToShip.filter((item) => item._id !== item._id)
												);
												item.quantity++;
												item.toship--;
												setItems([...items]);
											}
										}}
									>
										-
									</button>
									<span>{item.toship}</span>

									<button
										onClick={() => {
											if (item.quantity > 0) {
												setItemsToShip([...itemsToShip, item]);
												item.quantity--;
												item.toship++;
												setItems([...items]);
											}
										}}
									>
										+
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>

				<div>
					{/* create shipping section and dynamically update the item quantity to be shipped of same item */}
					<h3>Shipping</h3>
					<table>
						<thead>
							<tr>
								<th>Name</th>
								<th>To Shit</th>
							</tr>
						</thead>
						<tbody>
							{/* rendering the dictionaries inside itemstoship array. */}
							{itemsToShip.map((item) => (
								<tr key={item._id}>
									<td>{item.name}</td>
									<td>{item.toship}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
};

export default ItemTable;
