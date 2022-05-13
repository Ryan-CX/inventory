import React, { useState, useEffect } from 'react';
const axios = require('axios');

const WareHouseTable = () => {
	const [warehouse, setWarehouse] = useState('');
	const [warehouseList, setWarehouseList] = useState([]);

	//request to save new warehouse name to warehouses array
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post('http://localhost:5000/warehouse', {
				location: warehouse,
			});
			warehouseList.push(response.data);
			setWarehouse('');
			window.location.reload();
		} catch (error) {
			console.error(error.message);
		}
	};

	//get request to get all items
	const getWarehouse = async () => {
		try {
			const response = await axios.get('http://localhost:5000/warehouse');
			setWarehouseList(response.data);
		} catch (error) {
			console.error(error.message);
		}
	};

	//get all items on mount
	useEffect(() => {
		getWarehouse();
	}, []);

	return (
		<>
			{/* input field to enter new warehouse names and save to database and display in the table below */}
			<h3>Warehouse Table</h3>
			<div>
				<form onSubmit={handleSubmit}>
					<input
						type='text'
						placeholder='Enter warehouse name'
						value={warehouse}
						onChange={(e) => setWarehouse(e.target.value)}
					/>
					<button type='submit'>Save</button>
				</form>
			</div>
			<div className='table'>
				{/* display warehouses location in the warehouses array */}
				<table>
					<thead>
						<tr>
							<th>Location</th>
						</tr>
					</thead>
					<tbody>
						{warehouseList.map((warehouse) => (
							<tr key={warehouse._id}>
								<td>{warehouse.location}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default WareHouseTable;
