import ForwardIcon from '@mui/icons-material/Forward';
import { AppBar, Avatar, IconButton, Toolbar, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';

import { UserContext } from '@/applications/contexts/userContext';

const Header = () => {
  const { user } = useContext(UserContext);
  const router = useRouter();

  const pathname = usePathname();

  return (
    <AppBar position="fixed" sx={{ zIndex: 1000 }}>
      <Toolbar sx={{ position: 'relative' }}>
        {pathname.includes('condition') && (
          <IconButton
            sx={{ position: 'absolute', left: '8px' }}
            onClick={() => router.push('/')}
          >
            <ForwardIcon
              sx={{ transform: 'rotate(180deg)', color: '#fff', fontSize: 32 }}
            />
          </IconButton>
        )}
        <Typography
          variant="h6"
          noWrap
          component="div"
          textAlign="center"
          sx={{ width: '100%' }}
        >
          591租屋小幫手
        </Typography>
        <Avatar src={user.picture} sx={{ position: 'absolute', right: 16 }} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
