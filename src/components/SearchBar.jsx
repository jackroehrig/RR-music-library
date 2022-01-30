import { useContext } from 'react'
import { SearchContext } from '../context/SearchContext'

function SearchBar(){
    const {term, handleSearch} = useContext(SearchContext)

    return(
        <form>
            <input ref={term} placeholder='Search for music here...' onChange={(e) => handleSearch(e, term.current.value)}/>
        </form>
    )
}

export default SearchBar