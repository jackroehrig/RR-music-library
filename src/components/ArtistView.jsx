import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ArtistView = () => {
    const {id} = useParams()
    const [artistData, setArtistData] = useState([])

    return(
        <div>
            <h2>The id sent is {id}</h2>
            <p>Artist Data Goes Here!</p>
        </div>
    )
}

export default ArtistView