'use client';

import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  SelectChangeEvent,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import { Form, Formik } from 'formik';
import { useParams, useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

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
import validationSchema from '@/applications/validate/conditionSchema';
import ConfirmModal from '@/components/ConfirmModal';
import FloorSection from '@/components/FloorSection';
import KindSection from '@/components/KindSection';
import MultiAreaSection from '@/components/MultiAreaSection';
import MultiNoticeSection from '@/components/MultiNoticeSection';
import MultiRoomSection from '@/components/MultiRoomSection';
import NameSection from '@/components/NameSection';
import OptionSection from '@/components/OptionSeciton';
import OtherSection from '@/components/OtherSection';
import PriceSection from '@/components/PriceSection';
import RegionSection from '@/components/RegionSection';
import SectionSection from '@/components/SectionSection';
import ShapeSection from '@/components/ShapeSection';

const conditionDict: { [key: number]: string } = {
  0: '一',
  1: '二',
  2: '三',
  3: '四',
  4: '五',
};

const ConditionEditPage = () => {
  const { cId } = useParams<{ cId: string }>();

  const router = useRouter();
  const { showSnackBar } = useAlert();
  const { user } = useContext(UserContext) as ProfileContextProps;
  const { conditionList } = useContext(
    ConditionContext,
  ) as ConditionContextProps;
  const {
    requestGetCondition,
    condition,
    requestChangePush,
    requestUpdateCondition,
    requestDeleteCondition,
    isLoading,
  } = useCondition();

  const [open, setOpen] = useState(false);

  const handleSubmit = async (values: any) => {
    const index = conditionList.findIndex(
      (condition) => condition._id === values._id,
    );
    const data = {
      ...values,
      name: values.name || `第${conditionDict[index]}組條件`,
    };

    try {
      const res = await requestUpdateCondition(data);
      return showSnackBar(res as ConditionResponseProps);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetCondition = async (id: string) => {
    try {
      const res = await requestGetCondition(id);
      if (res && !res?.success) {
        router.push('/');
      }
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirmModalOpen = () => {
    setOpen(true);
  };

  const handleConfirmModalClose = () => {
    setOpen(false);
  };

  const handleDeleteCondition = async () => {
    try {
      const res = await requestDeleteCondition(condition._id as string);
      if (res && res.success) {
        handleConfirmModalClose();
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (cId) {
      handleGetCondition(cId);
    }
  }, [cId]);

  if (isLoading) {
    return (
      <Box
        component="div"
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box component="div" sx={{ pb: 12 }}>
      <Formik
        enableReinitialize
        initialValues={condition}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ handleChange, errors, values, setFieldValue }) => {
          const handleRegionChange = (e: SelectChangeEvent<string>) => {
            if (e.target.value !== condition.region) {
              setFieldValue('section', []);
            }
            handleChange(e);
          };

          const handleFieldChange = (
            e: React.ChangeEvent<HTMLInputElement>,
            module: string,
          ) => {
            const { checked } = e.target;
            if (e.target.name === '0') {
              if (checked) {
                return setFieldValue(module, []);
              }
            }
            if (!checked) {
              return setFieldValue(
                module,
                (values[module as keyof typeof condition] as string[]).filter(
                  (value) => value !== e.target.name,
                ),
              );
            }
            return setFieldValue(
              module,
              (values[module as keyof typeof condition] as string[]).concat(
                e.target.name,
              ),
            );
          };

          const handlePriceFieldChange = (
            e: React.ChangeEvent<HTMLInputElement>,
            module: string,
          ) => {
            if (
              (values.min_price || values.max_price) &&
              e.target.value !== 'on'
            ) {
              setFieldValue('price', []);
            }

            if (e.target.value === 'on') {
              setFieldValue('min_price', '');
              setFieldValue('max_price', '');
            }

            if (e.target.name === 'min_price') {
              return setFieldValue('min_price', e.target.value);
            }
            if (e.target.name === 'max_price') {
              return setFieldValue('max_price', e.target.value);
            }

            handleFieldChange(e, module);
          };

          const handleMultiAreaFieldChange = (
            e: React.ChangeEvent<HTMLInputElement>,
            module: string,
          ) => {
            if (
              (values.min_area || values.max_area) &&
              e.target.value !== 'on'
            ) {
              setFieldValue('multiArea', []);
            }

            if (e.target.value === 'on') {
              setFieldValue('min_area', '');
              setFieldValue('max_area', '');
            }

            if (e.target.name === 'min_area') {
              return setFieldValue('min_area', e.target.value);
            }
            if (e.target.name === 'max_area') {
              return setFieldValue('max_area', e.target.value);
            }

            handleFieldChange(e, module);
          };

          const handleToggleButtonChange = (value: string, module: string) => {
            setFieldValue(module, value);
          };

          const handleChangePush = async (
            e: React.ChangeEvent<HTMLInputElement>,
          ) => {
            try {
              setFieldValue('push', e.target.checked);
              const res = await requestChangePush(condition._id as string);
              return showSnackBar(res as ConditionResponseProps);
            } catch (error) {
              console.log(error);
            }
          };

          return (
            <Form>
              <Grid container gap={2}>
                {/* Control Panel */}
                <Grid item xs={6}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="h6" sx={{ fontSize: 18 }}>
                      推播
                    </Typography>
                    <Switch
                      id="push"
                      name="push"
                      checked={values.push}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChangePush(e)
                      }
                    />
                  </Stack>
                </Grid>
                {/* Name 條件名稱 */}
                <NameSection
                  value={values.name as string}
                  onChange={handleChange}
                  index={conditionList.length - 1}
                />
                {/* Region 地區 */}
                <RegionSection
                  value={values.region as string}
                  onChange={handleRegionChange}
                  error={Boolean(errors.region)}
                  helpText={errors.region || ''}
                />
                {/* Section 位置 */}
                <SectionSection
                  region={values.region as string}
                  value={values.section as string[]}
                  onChange={handleChange}
                />
                {/* Kind 類型 */}
                <KindSection
                  module="kind"
                  value={values.kind as string}
                  onChange={handleToggleButtonChange}
                />
                {/* Price 租金 */}
                <PriceSection
                  module="price"
                  value={values.price as string[]}
                  onChange={handlePriceFieldChange}
                  min_price={values.min_price as string}
                  max_price={values.max_price as string}
                  error={Boolean(errors.min_price || errors.max_price)}
                  helpText={errors.min_price || errors.max_price || ''}
                />
                {/* MultiRoom 格局 */}
                <MultiRoomSection
                  module="multiRoom"
                  value={values.multiRoom as string[]}
                  onChange={handleFieldChange}
                />
                {/* Other 特色 */}
                <OtherSection
                  module="other"
                  value={values.other as string[]}
                  onChange={handleFieldChange}
                />
                {/* Shape 型態 */}
                <ShapeSection
                  module="shape"
                  value={values.shape as string[]}
                  onChange={handleFieldChange}
                />
                {/* MultiArea 坪數 */}
                <MultiAreaSection
                  module="multiArea"
                  value={values.multiArea as string[]}
                  onChange={handleMultiAreaFieldChange}
                  min_area={values.min_area as string}
                  max_area={values.max_area as string}
                  error={Boolean(errors.min_area || errors.max_area)}
                  helpText={errors.min_area || errors.max_area || ''}
                />
                {/* Floor 樓層 */}
                <FloorSection
                  module="floor"
                  value={values.floor as string}
                  onChange={handleToggleButtonChange}
                />
                {/* Option 設備 */}
                <OptionSection
                  module="option"
                  value={values.option as string[]}
                  onChange={handleFieldChange}
                />
                {/* MultiNotice 須知 */}
                <MultiNoticeSection
                  module="multiNotice"
                  value={values.multiNotice as string[]}
                  onChange={handleFieldChange}
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  儲存
                </Button>
                <Divider sx={{ mt: 1, borderColor: '#' }} />
                <Button
                  fullWidth
                  variant="contained"
                  color="error"
                  sx={{ mt: 1 }}
                  onClick={handleConfirmModalOpen}
                >
                  刪除
                </Button>
              </Grid>
            </Form>
          );
        }}
      </Formik>

      <ConfirmModal
        title="警告"
        content="確認刪除此條件？"
        open={open}
        handleClose={handleConfirmModalClose}
        handleSubmit={handleDeleteCondition}
      />
    </Box>
  );
};

export default ConditionEditPage;
