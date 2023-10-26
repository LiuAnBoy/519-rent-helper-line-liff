import { Box, CircularProgress } from '@mui/material';

const Loading = () => {
  return (
    <Box
      component="div"
      sx={{
        // width: '100vw',
        height: 'inherit',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;
