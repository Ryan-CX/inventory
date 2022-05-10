import './App.css';
import ItemTable from './components/ItemTable';
import InputItem from './components/AddItem';

function App() {
	return (
		<div className='App'>
			<InputItem />
			<ItemTable />
		</div>
	);
}

export default App;
