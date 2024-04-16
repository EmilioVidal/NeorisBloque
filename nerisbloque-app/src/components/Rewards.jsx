import * as React from 'react';
import { Card, CardActionArea, CardMedia, Box } from '@mui/material';
import './Rewards.css';

const RewardCard = ({ image, alt }) => {
  const [isFlipped, setIsFlipped] = React.useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <Card className={`card ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
      <CardActionArea>
        <div className="card-front">
          <CardMedia
            component="img"
            height="140"
            image={image}
            alt={alt}
            className="card-image"
          />
        </div>
      </CardActionArea>
    </Card>
  );
};

const Rewards = () => {
  return (
    <div>
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
      <div className="card-container">
        {/* Uso de RewardCard */}
        <RewardCard image="./Gift.jpg" alt="Gift 1" />
        <RewardCard image="./Gift.jpg" alt="Gift 2" />
        <RewardCard image="./Gift.jpg" alt="Gift 3" />
        <RewardCard image="./Gift.jpg" alt="Gift 4" />
        <RewardCard image="./Gift.jpg" alt="Gift 5" />
        <RewardCard image="./Gift.jpg" alt="Gift 6" />
        {/* Puedes agregar más tarjetas según sea necesario */}
      </div>
    </div>
  );
};

export default Rewards;