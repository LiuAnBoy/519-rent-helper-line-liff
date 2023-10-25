import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useContext } from 'react';

import { ProfileContextProps, UserContext } from '@/applications/hooks/useUser';

export default function HomePage() {
  const { user } = useContext(UserContext) as ProfileContextProps;

  return (
    <Box sx={{ display: 'flex' }}>
      <Typography
        variant="h6"
        sx={{ textAlign: 'center', position: 'relative' }}
      >
        Hi {user.name},
        {user.notify_token && user.condition ? ' 歡迎回來' : ' 請先設定條件'}
      </Typography>
    </Box>
  );
}
