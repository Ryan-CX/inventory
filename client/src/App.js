import './App.css';
import ItemTable from './components/ItemTable';
import InputItem from './components/AddItem';
import Warehouse from './components/Warehouse';

function App() {
	return (
		<div className='App'>
			<InputItem />
			<ItemTable />
			<Warehouse />
		</div>
	);
}

export default App;
