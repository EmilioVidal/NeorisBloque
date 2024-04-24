import * as React from 'react';
import './Rewards.css';
import currency from '../img/Digital Currency Logo.png';
import cabra from '../img/cabra.png';
import AppBar from './AppBar';
import TheScore from './Score';
import Box from '@mui/material/Box';

const cards = [
  { name: 'Regalo 1', price: '10' },
  { name: 'Regalo 2', price: '20' },
  { name: 'Regalo 3', price: '15' },
  { name: 'Regalo 4', price: '30' },
  { name: 'Regalo 5', price: '25' },
  { name: 'Regalo 6', price: '12' },
];


const Rewards = ({profileImageUrl}) => {

  return (
    <div>
      <AppBar profileImageUrl={profileImageUrl} />
        <TheScore profileImageUrl={profileImageUrl} />
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
                <img src="./Gift.jpg" alt="regalo" id='imagen' />
                <div className='conten'>
                  <p>{card.price}</p>
                  <img id='moneda' src={currency} alt="moneda" />
                </div>
              </div>
              <div className="back">
                <header>
                  <img src={cabra} alt="cabra" id='cabra' />
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