import React, { useState, useEffect } from 'react';
const axios = require('axios');

const WareHouseTable = () => {
	const [warehouses, setWarehouse] = useState([]);

	//request to save new warehouse name to warehouses array
	const saveWarehouse = async (name) => {
		try {
			const response = await axios.post('http://localhost:5000/warehouse', {
				location: name,
			});
			setWarehouse(response.data);
		} catch (error) {
			console.error(error.message);
		}
	};

	//get request to get all items
	const getWarehouse = async () => {
		try {
			const response = await axios.get('http://localhost:5000/warehouse');
			setWarehouse(response.data);
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
			<div>
				<form onSubmit={saveWarehouse}>
					<input
						type='text'
						placeholder='Enter warehouse name'
						onChange={warehouses}
					/>
					<button type='submit'>Save</button>
				</form>
			</div>
			<div className='table'>
				<h3>Warehouse Table</h3>
				{/* display warehouses location in the warehouses array */}
				<table>
					<thead>
						<tr>
							<th>Location</th>
						</tr>
					</thead>
					<tbody>
						{warehouses.map((warehouse) => (
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
