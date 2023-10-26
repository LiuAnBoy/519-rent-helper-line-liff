'use client';

import ControlPointIcon from '@mui/icons-material/ControlPoint';
import {
  Alert,
  CircularProgress,
  IconButton,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';

import {
  ConditionContext,
  ConditionContextProps,
} from '@/applications/contexts/conditionContext';
import {
  ProfileContextProps,
  UserContext,
} from '@/applications/contexts/userContext';
import useAlert from '@/applications/hooks/useAlert';
import useCondition, {
  ConditionResponseProps,
} from '@/applications/hooks/useCondition';
import ConditionCard from '@/components/ConditionCard';
import NotifySection from '@/components/NotifySection';

import Loading from './loading';

export default function HomePage() {
  const router = useRouter();

  const { user } = useContext(UserContext) as ProfileContextProps;
  const { requestChangePush } = useCondition();
  const { showSnackBar } = useAlert();
  const { conditionList } = useContext(
    ConditionContext,
  ) as ConditionContextProps;

  const [isLoading, setIsLoading] = useState(false);

  const handleChangePush = async (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
  ) => {
    e.stopPropagation();
    e.preventDefault();
    setIsLoading(true);
    const res = await requestChangePush(id);
    setIsLoading(false);
    return showSnackBar(res as ConditionResponseProps);
  };

  const goCreatePage = () => {
    router.push('/condition/create');
  };

  if (Object.keys(user).length === 0 || conditionList.length === 0)
    return <Loading />;

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{ textAlign: 'center', position: 'relative' }}
      >
        Hi {user.name},
        {user.notify_token && user.condition ? ' 歡迎回來' : ' 請先設定條件'}
      </Typography>

      {!user.notify_token && <NotifySection id={user.line_id} />}

      {user.notify_token && (
        <Stack sx={{ mt: 4 }} gap={2}>
          {conditionList.map((condition) => (
            <ConditionCard
              {...condition}
              key={condition._id}
              changePush={handleChangePush}
            />
          ))}
        </Stack>
      )}

      {conditionList.length <= 3 && (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            mt: 2,
          }}
        >
          <IconButton onClick={goCreatePage}>
            <ControlPointIcon
              sx={{ width: '100px', height: '100px', color: '#ccc' }}
            />
          </IconButton>
        </Box>
      )}

      <Snackbar
        open={isLoading}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ display: 'flex', alignItems: 'center', top: 24 }}
      >
        <Alert
          sx={{ width: '100%' }}
          icon={<CircularProgress size="18px" />}
          severity="info"
        >
          儲存中
        </Alert>
      </Snackbar>
    </Box>
  );
}
