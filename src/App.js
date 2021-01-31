
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css';

function App() {
  const [photos, setPhotos] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [fetching, setFetching] = useState([])
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    if(fetching) {
      axios.get(`https://jsonplaceholder.typicode.com/photos?_limit=10&_page=${currentPage}`)
        .then(res => {
          setPhotos([...photos, ...res.data])
          setCurrentPage(prevState => prevState + 1)
          setTotalCount(res.headers['x-total-count'])
        })
        .finally(() => setFetching(false))
    }
    
  }, [fetching])


  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return () => { document.removeEventListener('scroll', scrollHandler) }
  }, [])

  const scrollHandler = (e) => {
    if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
      setFetching(true)
    }
  }

  return (
    <div className="App">
      { photos.map(photo => (
        <div key={photo.id}>
          <div>{photo.title}</div>
          <img src={photo.thumbnailUrl} />
        </div>
      )) }
    </div>
  );
}

export default App;
