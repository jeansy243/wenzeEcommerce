import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import { Google, Facebook, LockOutlined } from '@mui/icons-material';
import { Switch } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm, FieldValues } from 'react-hook-form';
import { toast } from 'react-toastify';
import { signInUser } from './accountSlice';
import { store, useAppDispatch } from '../../app/store/configureStore';

// Utilisation du thème par défaut de Material-UI
const theme = createTheme();

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function SignInPage() {
  const [darkMode, setDarkMode] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // for location state.redirect
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    mode: 'onTouched',
  });

  const handleThemeChange = () => setDarkMode(!darkMode);

  async function submitForm(data: FieldValues) {
    try {
      // Attempting to sign in the user
      await dispatch(signInUser(data));
      const { user } = store.getState().account;
      
      if (user) {
        toast.success('Sign-in successful');
        // Navigate to the original location or the default dashboard
        navigate(location.state?.from || '/store');
      } else {
        toast.error('Sign-in failed. Please check your credentials');
      }
    } catch (error) {
      console.error('Sign-in failed:', error);
      toast.error('Sign-in failed. Please try again.');
    }
  };

  return (
    <ThemeProvider theme={createTheme({ palette: { mode: darkMode ? 'dark' : 'light' } })}>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        {/* Mode de couleur */}
        <Box sx={{ position: 'fixed', top: '1rem', right: '1rem' }}>
          <Switch checked={darkMode} onChange={handleThemeChange} />
        </Box>
        <Card variant="outlined">
          <LockOutlined sx={{ fontSize: 60, marginBottom: 2 }} />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(submitForm)}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="username">Username</FormLabel>
              <TextField
                error={!!errors.username}
                helperText={errors.username ? errors.username.message : ''}
                id="username"
                placeholder="your username"
                required
                fullWidth
                variant="outlined"
                {...register('username', {
                  required: 'Username is required',
                  minLength: {
                    value: 3,
                    message: 'Username must be at least 3 characters long',
                  },
                })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ''}
                placeholder="••••••"
                type="password"
                id="password"
                required
                fullWidth
                variant="outlined"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters long',
                  },
                })}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isSubmitting}
            >
              Sign in
            </Button>
            <Link
              component="button"
              onClick={() => alert('Forgot your password?')}
              variant="body2"
              sx={{ alignSelf: 'center' }}
            >
              Forgot your password?
            </Link>
          </Box>
          <Divider>or</Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign in with Google')}
              startIcon={<Google />}
            >
              Sign in with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign in with Facebook')}
              startIcon={<Facebook />}
            >
              Sign in with Facebook
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
              Don&apos;t have an account?{' '}
              <Link href="/sign-up" variant="body2" sx={{ alignSelf: 'center' }}>
                Sign up
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </ThemeProvider>
  );
}
