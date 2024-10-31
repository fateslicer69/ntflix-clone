import React from 'react'
import './Home.css'
import Navbar from '../../Components/Navbar/Navbar'
import hero_banner from '../../assets/hero_banner.jpg'
import hero_title from '../../assets/hero_title.png'
import play_icon from '../../assets/play_icon.png'
import info_icon from '../../assets/info_icon.png'
import TitleCards from '../../Components/TitleCards/TitleCards'
import Footer from '../../Components/Footer/Footer'

const Home = () => {
  return (
    <div className='home'>
      <Navbar />
      <div className="hero">
        <img src={hero_banner} alt='hero background' className='banner-img' />
        <div className="hero-caption">
          <img src={hero_title} alt='hero caption' className='caption-img' />
          <p>Discovering his ties to an ancient secret order, a young man living in modern Istanbul embarks on a quest to save the city from an immortal enemy.</p>
          <div className="hero-btns">
            <button className='btn'>
              <img src={play_icon} alt='play icon' className='btn-icon' /> Play
            </button>
            <button className='btn dark'>
              <img src={info_icon} alt='info icon' className='btn-icon' /> More Info
            </button>
          </div>
          <TitleCards /> {/* TitleCards below hero */}
        </div>
        <div className="more-cards">
        <TitleCards  title= {"blockbuster Movies"}  category={"top_rated"}/>
        <TitleCards title= {"Only On Netflix"}   category={"popular"} />
        <TitleCards title= {"Upcoming"} category={"upcoming"} />
        <TitleCards title= {"Top Picks For You"} category={"now_playing"} />
        </div>
        <Footer />
      </div>
       
    </div>
  )
}

export default Home