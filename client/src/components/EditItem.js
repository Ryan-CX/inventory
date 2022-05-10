import React, { useState } from 'react';

const EditItem = ({ item }) => {
	const [show, setShow] = useState(false);
	const [name, setName] = useState(item.name);
	const [description, setDescription] = useState(item.description);
	const [price, setPrice] = useState(item.price);
	const [quantity, setQuantity] = useState(item.quantity);

	//input change handlers
	const handleNameChange = (event) => {
		setName(event.target.value);
	};
	const handleDescriptionChange = (event) => {
		setDescription(event.target.value);
	};
	const handlePriceChange = (event) => {
		setPrice(event.target.value);
	};
	const handleQuantityChange = (event) => {
		setQuantity(event.target.value);
	};

	const toggle = () => {
		setShow(!show);
	};

	//put request to update item
	const updateItem = async (event) => {
		if (
			!isNaN(price) &&
			!isNaN(quantity) &&
			parseInt(price) >= 0 &&
			parseInt(quantity) >= 0
		) {
			try {
				const body = {
					name,
					description,
					price,
					quantity,
				};
				const response = await fetch(
					`http://localhost:5000/items/${item._id}`,
					{
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(body),
					}
				);
				toggle();
			} catch (error) {
				console.error(error.message);
			}
		} else {
			event.preventDefault();
			alert('Please enter a valid number for price and quantity');
		}
	};

	return (
		<div>
			<div className={show ? 'toggle display-block' : 'toggle display-none'}>
				<section className='toggle-main'>
					<h3>Update Item</h3>
					<form onSubmit={updateItem}>
						<input
							type='text'
							placeholder='Name'
							value={name}
							onChange={handleNameChange}
							required
						/>
						<input
							type='text'
							placeholder='Description'
							value={description}
							onChange={handleDescriptionChange}
							required
						/>
						<input
							type='text'
							placeholder='Price'
							value={price}
							onChange={handlePriceChange}
							required
						/>
						<input
							type='text'
							placeholder='quantity'
							value={quantity}
							onChange={handleQuantityChange}
							required
						/>
						<input type='submit' value='Update Item' />
					</form>
					<button onClick={toggle}>Cancel</button>
				</section>
			</div>
			<button onClick={toggle}>Edit</button>
		</div>
	);
};

export default EditItem;
