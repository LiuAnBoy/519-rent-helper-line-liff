import ForwardIcon from '@mui/icons-material/Forward';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Switch,
  Typography,
} from '@mui/material';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

import Region from '@/Utils/Region';
import Section from '@/Utils/Section';

const ConditionCard: FC<ConditionCardProps> = ({
  name,
  region,
  section,
  created_at,
  push,
  _id,
  changePush,
}) => {
  const router = useRouter();
  const goEditPage = () => {
    router.push(`/condition/edit/${_id}`);
  };

  const CardTitle = () => {
    return <Typography variant="body1">{name}</Typography>;
  };

  const CardSubheader = () => {
    return (
      <Typography variant="body2">
        建立時間：{moment(created_at).format('YYYY-MM-DD HH:mm:ss')}
      </Typography>
    );
  };

  return (
    <Card sx={{ border: '1px solid #ccc', boxShadow: 0 }}>
      <CardHeader
        sx={{ pb: 0 }}
        action={
          <Switch
            checked={push}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              changePush(e, _id)
            }
          />
        }
        title={<CardTitle />}
        subheader={<CardSubheader />}
      />
      <CardContent sx={{ pt: 1, pb: 1 }}>
        <Typography variant="body2" color="#a3a3a3">
          地區: {Region[region as keyof typeof Region]}
        </Typography>
        <Typography variant="body2" color="#a3a3a3">
          位置:{' '}
          {section.length > 0
            ? section
                .map(
                  (s) =>
                    Section[region as keyof typeof Section][
                      s as keyof (typeof Section)[keyof typeof Section]
                    ],
                )
                .join('、')
            : '不限'}
        </Typography>
      </CardContent>
      <CardActions sx={{ pt: 0, px: 1.3 }}>
        <Button variant="text" size="small" onClick={goEditPage}>
          編輯條件
        </Button>
      </CardActions>
    </Card>
  );
};

export default ConditionCard;

interface ConditionCardProps {
  name: string;
  region: string;
  section: string[];
  push: boolean;
  created_at: Date;
  _id: string;
  changePush: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
}
