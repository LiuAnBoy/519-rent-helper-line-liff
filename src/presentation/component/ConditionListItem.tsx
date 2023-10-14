import React from 'react';
import {
  ListItem,
  ListItemText,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import Region from '../../Utils/Region';
import Section from '../../Utils/Section';
import { ConditionExtraProps } from '../../pages/condition';
import useCondition, {
  ConditionResponseProps,
} from '../../application/hook/useCondition';

const ConditionListItem: React.FC<ConditionListItemProps> = ({
  condition,
  showSnackBar,
}) => {
  const navigate = useNavigate();
  const { requestChangePush } = useCondition();

  const [push, setPush] = React.useState<boolean>(condition.push);

  const handlePush = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const res = await requestChangePush(condition.user_id, condition.number);
    setPush(!push);
    return showSnackBar(res as ConditionResponseProps);
  };

  return (
    <ListItem
      sx={{
        border: '1px solid #ccc',
        borderRadius: '5px',
        cursor: 'pointer',
        my: 3,
      }}>
      <ListItemText
        primary={
          <Stack
            flexDirection='row'
            justifyContent='space-between'
            alignItems='center'>
            <Typography variant='body1'>
              {`條件-${condition.number}`}
            </Typography>
            <Switch edge='end' checked={push} onChange={handlePush} />
          </Stack>
        }
        secondary={
          <Stack
            flexDirection='column'
            onClick={() => navigate(`/condition/${condition.number}`)}>
            <Typography variant='body2'>
              地區: {Region[condition.region as keyof typeof Region]}
            </Typography>
            <Typography variant='body2'>
              位置:{' '}
              {condition.section.length > 0
                ? condition.section
                    .map(
                      s =>
                        Section[condition.region as keyof typeof Section][
                          s as keyof (typeof Section)[keyof typeof Section]
                        ]
                    )
                    .join('、')
                : '不限'}
            </Typography>
          </Stack>
        }
      />
    </ListItem>
  );
};

export default ConditionListItem;

interface ConditionListItemProps {
  condition: ConditionExtraProps;
  showSnackBar: (res: ConditionResponseProps) => void;
}
