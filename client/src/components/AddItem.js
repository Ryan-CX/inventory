import React, { useState } from 'react';

const InputItem = () => {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [quantity, setQuantity] = useState('');

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
	const handleAmountChange = (event) => {
		setQuantity(event.target.value);
	};

	//post request to add item
	const addItem = async (event) => {
		//event.preventDefault();
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

				const response = await fetch('http://localhost:5000/items', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(body),
				});
			} catch (error) {
				console.error(error.message);
			}

			setName('');
			setDescription('');
			setPrice('');
			setQuantity('');
		} else {
			event.preventDefault();
			alert('Invalid input');
		}
	};

	return (
		<div className='add'>
			<h3>Add New Item</h3>
			<form onSubmit={addItem} className='form'>
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
					placeholder='Quantity'
					value={quantity}
					onChange={handleAmountChange}
					required
				/>
				<input type='submit' value='Add New Item' />
			</form>
		</div>
	);
};

export default InputItem;
