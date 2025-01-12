import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { Box, Typography, Button } from '@mui/material';

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '80vh',
  textAlign: 'center',
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  padding: theme.spacing(3),
}));

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  marginTop: theme.spacing(2),
}));

export default function Error404Page() {
  return (
    <Container>
      <Typography variant="h1" component="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        Ooops... Here is an undefined page!
      </Typography>
      <StyledLink to="/">
        <Button variant="contained" color="primary" sx={{backgroundColor: '#1e1e1e'}}>
          Back to Home
        </Button>
      </StyledLink>
    </Container>
  );
}