
import './App.css'
import Accordion from './components/Accordion'
import Card from './components/Card'
import Search from './components/Search'

function App() {
  
  const handleOnSearchChange = (searchData) => {
    console.log(searchData)
  }

  return (
    <div>
      <Search onSearchChange={handleOnSearchChange} />   
      <Card />
      <Accordion/>
    </div>
  )
}

export default App
