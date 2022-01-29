function SearchBar(props){
    return(
        <form>
            <input placeholder='Search for music here...' onChange={(e) => props.handleSearch(e, e.target.value)}/>
        </form>
    )
}

export default SearchBar