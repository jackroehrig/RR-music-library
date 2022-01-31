import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const ArtistView = () => {
    const {id} = useParams()
    const [artistData, setArtistData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const API_URL = `http://localhost:4000/album/${id}`
        const fetchData = async () => {
            const res = await fetch(API_URL)
            const resData = await res.json()
            setArtistData(resData.results)
        }
        fetchData()
    }, [id])

    const justAlbums = artistData.filter(entry => entry.wrapperType === 'collection')

    const renderAlbums = justAlbums.map((album, index) => {
        return(
            <div key={index}>
                <Link to={`/album/${album.collectionId}`}>
                    <p>{album.collectionName}</p>
                </Link>
            </div>
        )
    })

    const navButtons = () => {
        return (
            <div>
                <button onClick={() => navigate(-1)}>Back</button>
                |
                <button onClick={() => navigate('/', {replace: true})}>Home</button>
            </div>
        )
    }

    return(
        <div>
            {artistData.length > 0 ? <h2>{artistData[0].artistName}</h2> : <h2>Loading...</h2>}
            {navButtons()}
            {renderAlbums}
        </div>
    )
}

export default ArtistView