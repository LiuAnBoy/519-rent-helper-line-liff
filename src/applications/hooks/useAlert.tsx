import { useSnackbar } from 'notistack';

const useAlert = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showSnackBar = (res: SnackBarProps) => {
    enqueueSnackbar(res.message, {
      variant: res.success ? 'success' : 'error',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
      autoHideDuration: 2000,
    });
  };

  const loadingSnackBar = () => {
    enqueueSnackbar('儲存中', {
      variant: 'info',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
      autoHideDuration: 2000,
    });
  };

  return { showSnackBar, loadingSnackBar };
};

export default useAlert;

export interface SnackBarProps {
  success: boolean;
  message: string;
}
