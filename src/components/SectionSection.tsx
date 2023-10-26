import {
  Box,
  Chip,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { FormikHandlers } from 'formik';
import React, { FC } from 'react';

import Section from '@/Utils/Section';

const SectionSection: FC<SectionProps> = ({ onChange, value, region }) => {
  return (
    <Grid container item>
      <Grid item xs={2}>
        <Typography
          variant="h6"
          sx={{
            position: 'relative',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: 18,
          }}
        >
          位置
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <FormControl fullWidth>
          <Select
            id="section"
            name="section"
            multiple
            displayEmpty
            value={value}
            onChange={onChange}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return '不限';
              }
              return (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      color="primary"
                      variant="outlined"
                      label={
                        Section[region as keyof typeof Section][
                          value as keyof (typeof Section)[keyof typeof Section]
                        ] as string
                      }
                    />
                  ))}
                </Box>
              );
            }}
          >
            {Object.entries(Section[region as keyof typeof Section]).map(
              ([key, value]) => (
                <MenuItem key={key} value={key}>
                  {value}
                </MenuItem>
              ),
            )}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default SectionSection;

interface SectionProps {
  onChange: FormikHandlers['handleChange'];
  value: string[];
  region: string;
}
