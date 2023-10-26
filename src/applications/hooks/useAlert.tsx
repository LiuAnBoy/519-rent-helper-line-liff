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

  return { showSnackBar };
};

export default useAlert;

export interface SnackBarProps {
  success: boolean;
  message: string;
}
