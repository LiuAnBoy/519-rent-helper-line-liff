import React, { useContext } from 'react';
import { AppBar, Avatar, IconButton, Toolbar, Typography } from '@mui/material';
import ForwardIcon from '@mui/icons-material/Forward';

import { ProfileProps } from '../../App';
import { UserContext } from '../../application/hook/useUser';

const NabBar = () => {
  const isConditionPage = window.location.pathname.includes('condition');

  const user = useContext(UserContext) as ProfileProps;

  return (
    <AppBar>
      <Toolbar
        sx={{
          position: 'relative',
        }}>
        {isConditionPage && (
          <IconButton
            sx={{ position: 'absolute', left: '8px' }}
            onClick={() => (window.location.href = '/')}>
            <ForwardIcon
              sx={{ transform: 'rotate(180deg)', color: '#fff', fontSize: 32 }}
            />
          </IconButton>
        )}
        <Typography
          variant='h6'
          component='div'
          textAlign='center'
          sx={{ width: '100%' }}>
          591租屋小幫手
        </Typography>

        <IconButton
          sx={{
            position: 'absolute',
            right: '8px',
          }}>
          <Avatar src={user.picture} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NabBar;
