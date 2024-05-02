import * as React from 'react';
import './Rewards.css';
import currency from '../img/Digital Currency Logo.png';
import cabra from '../img/cabra.png';
import cabra2 from '../img/cabra2.png';
import cabra3 from '../img/cabra3.png';
import cabra4 from '../img/cabra4.png';
import regalo from '../img/regalo.png';
import regalo2 from '../img/regalo2.png';
import Gift from '../img/Gift.jpg';
import AppBar from './AppBar';
import TheScore from './Score';
import Box from '@mui/material/Box';

const cards = [
  { name: 'Regalo 1', price: '10', image: regalo },
  { name: 'Regalo 2', price: '20', image: regalo2 },
  { name: 'Regalo 3', price: '15', image: cabra },
  { name: 'Regalo 4', price: '30', image: cabra2 },
  { name: 'Regalo 5', price: '25', image: cabra3 },
  { name: 'Regalo 6', price: '12', image: cabra4 },
];

const Rewards = ({ profileImageUrl, coins }) => {
  return (
    <div>
      <AppBar profileImageUrl={profileImageUrl} />
      <TheScore profileImageUrl={profileImageUrl} coins={coins} />
      <Box
        sx={{
          borderRadius: '10px',
          bgcolor: 'gray',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '10px',
        }}
      >
        <h1 style={{ color: 'white' }}>Rewards</h1>
      </Box>
      <section className="page card-1-page">
        <div className="cards">
          {cards.map((card) => (
            <label key={card.name} id={card.name}>
              <input type="checkbox" />
              <div className="card">
                <div className="front">
                  <img src={Gift} alt="gift" id='gift' />
                  <div className='conten'>
                    <p>{card.price}</p>
                    <img id='moneda' src={currency} alt="moneda" />
                  </div>
                </div>
                <div className="back">
                  <header>
                    <img src={card.image} alt="regalo" id='imagen' />
                  </header>
                </div>
              </div>
            </label>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Rewards;
