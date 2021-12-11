import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'
import uuid from 'react-uuid'
import Writers from './Writers';
import Writerstoo from './Writerstoo';


// Backendin index-url
const URL = 'http://localhost/imdb-harjoitustyo/'

function App() {

  // Tilamuuttujat taulukolle ja spinnerille
  const [movies, setMovies] = useState([])
  const [isLoaded, setIsLoaded] = useState(null)

  // axiosilla haetaan data tilamuuttujan taulukkoon
  useEffect(() => {
    setIsLoaded(false)
    axios.get(URL)
    .then((response) => {
      // console.log(response.data);
      setMovies(response.data)
      setIsLoaded(true)
    }).catch(error => {
      alert(error.response ? error.response.data.error : error)
    })
  }, [])

  return (
    <div className='container'>
      
      <h3 className='m-2'>Welcome to IMDB mostly fantasy!</h3>
            <p className='center'>Don't mind me, I'm taking my time...</p>
            <h5 className='mt-3 mb-3'>Top 10 longest fantasy movies ever - wait 'til you see...</h5>
            <div className='row'>
                <table className='table'>
                    <thead>
                        <th>Movie name</th>
                        <th>Runtime minutes</th>
                        <th>Category</th>
                    </thead>
                    <tbody>
                      {/* Näytetään spinneri niin kauan kuin taulukko latautuu */}
                    {isLoaded === false ? (
                            <div className="spinner-border text-info" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        ) : (
                          // Mapataan taulukosta halutut tiedot sivulle
                        (movies?.map(movie => (
                            <tr key={uuid()}>
                                <td>{movie.primary_title}</td>
                                <td>{movie.runtime_minutes}</td>
                                <td>{movie.genre}</td>
                            </tr>
                        )))
                        )}
                    </tbody>
                </table>
                <div className=''>
                    <h5 className='mt-3 mb-3'>Find out screenwriters who also played 
                    some kind of role in your favorite fantasy series</h5>
                    {/* Haetaan toisissa komponenteissa olevat tiedot */}
                   <Writers url={URL}/>
                   <Writerstoo url={URL}/>
                </div>
            </div>
        
    </div>
  );
}

export default App;
