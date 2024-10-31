import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: ""
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YTkwMWFkNmZiNGFmYTg2NjU4MjlhZTJkMTllMTE4OSIsIm5iZiI6MTczMDM1NDY3MS42ODM3Niwic3ViIjoiNjcyMzFhYjgwMDNjNGI1YjViNjQ0MzI4Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.a5KyrH1bqyR0wa3jko3KHCxntoX8IW-3dSuTe1dfOKc'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => {
        if (res.results && res.results.length > 0) {
          setApiData(res.results[0]);
        } else {
          console.warn('No videos found.');
        }
      })
      .catch(err => console.error(err));
  }, [id]); // Include id as a dependency

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt='Back arrow icon' onClick={() => navigate(-1)} />
      {apiData.key ? (
        <iframe
          width='90%'
          height='90%'
          src={`https://www.youtube.com/embed/${apiData.key}`}
          title='trailer'
          frameBorder='0'
          allowFullScreen
        ></iframe>
      ) : (
        <p>No video available.</p>
      )}
      <div className="player-info">
        <p>{apiData.published_at.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
}

export default Player;
