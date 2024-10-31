import React, { useRef, useEffect, useState } from 'react';
import './TitleCards.css';
import { Link } from 'react-router-dom';

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();
  

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YTkwMWFkNmZiNGFmYTg2NjU4MjlhZTJkMTllMTE4OSIsIm5iZiI6MTczMDM1NDY3MS42ODM3Niwic3ViIjoiNjcyMzFhYjgwMDNjNGI1YjViNjQ0MzI4Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.a5KyrH1bqyR0wa3jko3KHCxntoX8IW-3dSuTe1dfOKc'
    }
  };
  
  
  
 
 

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY; // Scroll horizontally
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));

    
    const currentRef = cardsRef.current;
    currentRef.addEventListener('wheel', handleWheel);
    
    return () => {
      currentRef.removeEventListener('wheel', handleWheel); // Cleanup event listener
    };
  }, [category]); // Include category as a dependency

  return (
    <div className='title-cards'>
      <h2>{title || "Popular On Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card) => (
          <Link to={`/player/${card.id}`} className="card" key={card.id}>
            <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt={card.original_title} />
            <p>{card.original_title}</p>
          </Link>
        ))}
        
      </div>
    </div>
  );
}

export default TitleCards;
