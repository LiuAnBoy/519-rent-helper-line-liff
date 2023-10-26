import { Grid, TextField } from '@mui/material';
import React, { FC } from 'react';

const NameSection: FC<NameProps> = ({ value, onChange, index }) => {
  const conditionDict: { [key: number]: string } = {
    0: '一',
    1: '二',
    2: '三',
    3: '四',
    4: '五',
  };

  return (
    <Grid container item>
      <Grid item xs={12}>
        <TextField
          id="name"
          name="name"
          fullWidth
          label="條件名稱"
          value={value}
          placeholder={`第${conditionDict[index as number]}組條件`}
          onChange={onChange}
        />
      </Grid>
    </Grid>
  );
};

export default NameSection;

interface NameProps {
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  value: string;
  index?: number;
}
