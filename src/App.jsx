import './App.css';
import {useEffect, useState} from 'react'
import SearchBar from './components/SearchBar';
import Gallery from './components/Gallery';

function App() {
  let [search, setSearch] = useState('')
  let [musicData, setData] = useState([])
  let [message, setMessage] = useState('Search for Music!')

  const API_URL = 'https://itunes.apple.com/search?term='

  useEffect(() => {
    if(search){
      const fetchData = async () => {
        document.title = `${search} Music`
        const response = await fetch(API_URL + search)
        const resData = await response.json()
        if(resData.results.length > 0) {
          setData(resData.results)
        } else {
          setMessage('Not Found')
        }
      }
      fetchData()
    }
  }, [search])

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
    console.log(retArr)
    return retArr.join('')
  }

  const handleSearch = (e, term) => {
    e.preventDefault()
    setSearch(titleCase(term))
  }

  return (
    <div className='app'>
      <h1>Jack's Music App</h1>
      <SearchBar handleSearch={handleSearch}/>
      {message}
      <Gallery data={musicData}/>
    </div>
  );
}

export default App;
