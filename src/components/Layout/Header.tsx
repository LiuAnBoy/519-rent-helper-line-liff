import { AppBar, Avatar, Toolbar, Typography } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="fixed" sx={{ zIndex: 2000 }}>
      <Toolbar sx={{ position: 'relative' }}>
        <Typography
          variant="h6"
          noWrap
          component="div"
          textAlign="center"
          sx={{ width: '100%' }}
        >
          591租屋小幫手
        </Typography>
        <Avatar sx={{ position: 'absolute', right: 16 }} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
