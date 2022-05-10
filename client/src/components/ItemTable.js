import React, { useState, useEffect } from 'react';
import EditItem from './EditItem';

const ItemTable = () => {
	const [items, setItems] = useState([]);
	const [deleteItems, setDeleteItems] = useState([]);
	const [comment, setComment] = useState('');

	const handleCommentChange = (event) => {
		setComment(event.target.value);
	};

	//get request to get all items
	const getItems = async () => {
		try {
			const response = await fetch('http://localhost:5000/items');
			const data = await response.json();
			setItems(data);
		} catch (error) {
			console.error(error.message);
		}
	};

	//delete request to delete item
	const deleteItem = async (id) => {
		try {
			const response = await fetch(`http://localhost:5000/items/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			// add deleted item to deleteItems array
			setDeleteItems([...deleteItems, items.find((item) => item._id === id)]);
			//add comment input to item's database's comment field
			const body = {
				comment,
			};
			const response2 = await fetch(`http://localhost:5000/items/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			});

			getItems();
		} catch (error) {
			console.error(error.message);
		}
	};

	//use undo function to add deleted item back to items array
	const undo = () => {
		setItems([...items, ...deleteItems]);
		setDeleteItems([]);
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
							<th>Deletion Comment</th>
							<th>Delete</th>
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
									<input value={item.comment} onChange={handleCommentChange} />
								</td>
								<td>
									<button onClick={() => deleteItem(item._id)}>Delete</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className='table'>
				<h3>Deletion History</h3>

				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Comments</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{deleteItems.map((item) => (
							<tr key={item._id}>
								<td>{item.name}</td>
								<td>{item.comment}</td>

								<td>
									<button onClick={undo}>Undo</button>
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
