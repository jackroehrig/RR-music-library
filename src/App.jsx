import './App.css';
import {useState, useRef} from 'react'
import SearchBar from './components/SearchBar';
import Gallery from './components/Gallery';
import { DataContext } from './context/DataContext';
import { SearchContext } from './context/SearchContext';

function App() {
  let [musicData, setData] = useState([])
  let [message, setMessage] = useState('Search for Music!')
  let searchInput = useRef('')

  const API_URL = 'https://itunes.apple.com/search?term='

  const titleCase = (term) => {
    let termArr = term.split('')
    let retArr = []
    termArr.forEach((char, index) => {
      if(index === 0){
        retArr.push(char.toUpperCase())
      } else if (termArr[index - 1] === ' '){
        retArr.push(char.toUpperCase())
      } else {
        retArr.push(char)
      }
    })
    return retArr.join('')
  }

  const handleSearch = (e, term) => {
    e.preventDefault()
    if(term){
      let searchTerm = titleCase(term)
      const fetchData = async () => {
        document.title = `${searchTerm} Music`
        const response = await fetch(API_URL + searchTerm)
        const resData = await response.json()
        if(resData.results.length > 0) {
          setData(resData.results)
          setMessage('These are some good tracks!')
        } else {
          setMessage('Not Found')
        }
      }
      fetchData()
    } else {
      setMessage('Search for Music!')
      setData([])
      document.title = 'Search For Music'
    }
  }

  return (
    <div className='app'>
      <h1>Jack's Music App</h1>
      <SearchContext.Provider value={{
        term: searchInput,
        handleSearch: handleSearch
      }}>
        <SearchBar />
      </SearchContext.Provider>
      {message}
      <DataContext.Provider value={musicData} >
        <Gallery />
      </DataContext.Provider >
    </div>
  );
}

export default App;
