import {
  Box,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import React, { useContext } from 'react';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../../application/hook/useUser';
import { ProfileProps } from '../../App';
import { ConditionContext } from '../../application/hook/useCondition';
import ConditionListItem from '../../presentation/component/ConditionListItem';
import { ConditionExtraProps } from '../condition';
import useSnackBar from '../../application/hook/useSnackBar';

const HomePage = () => {
  const navigate = useNavigate();
  const { showSnackBar } = useSnackBar();

  const user = useContext(UserContext) as ProfileProps;
  const conditionList = useContext(ConditionContext) as ConditionExtraProps[];

  const handleAddCondition = () => {
    navigate(`/condition/${user.condition + 1}`);
  };

  if (Object.keys(user).length === 0) {
    return (
      <Box
        component='div'
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Box component='div'>
      <Typography
        variant='h6'
        sx={{ textAlign: 'center', position: 'relative' }}>
        Hi {user.name},
        {conditionList.length > 0 ? ' 歡迎回來' : ' 請先設定條件'}
      </Typography>

      <Box
        component='div'
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
        }}>
        {conditionList.length > 0 && (
          <List sx={{ width: '100%' }}>
            {conditionList.map((condition, index) => (
              <ConditionListItem key={index} condition={condition} showSnackBar={showSnackBar} />
            ))}
          </List>
        )}
        {conditionList.length === 0 && (
          <IconButton onClick={handleAddCondition}>
            <ControlPointIcon sx={{ fontSize: '100px', color: '#ccc' }} />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
