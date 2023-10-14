import { useSnackbar } from 'notistack';

const useSnackBar = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showSnackBar = (res: SnackBarProps) => {
    enqueueSnackbar(res.message, {
      variant: res.success ? 'success' : 'error',
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left',
      },
    });
  };

  return { showSnackBar };
};

export default useSnackBar;

export interface SnackBarProps {
  success: boolean;
  message: string;
  data?: any;
}