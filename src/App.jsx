import './App.css';
import {useState} from 'react'
import SearchBar from './components/SearchBar';
import Gallery from './components/Gallery';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AlbumView from './components/AlbumView';
import ArtistView from './components/ArtistView';

function App() {
  let [musicData, setData] = useState([])
  let [message, setMessage] = useState('Search for Music!')

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
      <Router>
        <Routes>
          <Route exact path='/' element={
            <div>
              <h1>Jack's Music App</h1>
              <SearchBar handleSearch={handleSearch}/>
              {message}
              <Gallery data={musicData}/>
            </div>
          }/>
          <Route path='/album/:id' element={<AlbumView />} />
          <Route path='/artist/:id' element={<ArtistView />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
