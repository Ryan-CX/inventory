import './App.css';
import ItemTable from './components/ItemTable';
import InputItem from './components/AddItem';
function App() {
	return (
		<div className='App'>
			<header className='App-header'>
				<InputItem />
				<ItemTable />
			</header>
		</div>
	);
}

export default App;
