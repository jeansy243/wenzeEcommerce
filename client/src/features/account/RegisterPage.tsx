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
import { Switch, MenuItem, Select, InputLabel, FormControl as MuiFormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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

const SignUpContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100vh',
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

export default function Register() {
  const [formData, setFormData] = React.useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user', // Default role
    agreeTerms: false, // Checkbox state
  });

  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = React.useState('');
  const [darkMode, setDarkMode] = React.useState(false);
  const [termsError, setTermsError] = React.useState(false); // Error for terms checkbox
  const navigate = useNavigate(); // For redirection after registration

  const handleChange = (e: any) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: value !== undefined ? value : checked, // Handle both text and checkbox fields
    });

    // Clear error states when the user starts typing
    if (name === 'email') {
      setEmailError(false);
      setEmailErrorMessage('');
    }
    if (name === 'password') {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }
    if (name === 'confirmPassword') {
      setConfirmPasswordError(false);
      setConfirmPasswordErrorMessage('');
    }
    if (name === 'agreeTerms') {
      setTermsError(false); // Clear terms error when checked
    }
  };

  const validateInputs = () => {
    const { email, password, confirmPassword, agreeTerms } = formData;
    let isValid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage('Passwords do not match.');
      isValid = false;
    } else {
      setConfirmPasswordError(false);
      setConfirmPasswordErrorMessage('');
    }

    if (!agreeTerms) {
      setTermsError(true); // Show error if terms are not agreed
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (validateInputs()) {
      const { username, email, password, role } = formData;
      const requestBody = { 
        username, 
        email, 
        password, 
        roles: [role] 
      };
  
      try {
        const response = await fetch('http://localhost:8083/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
  
        if (response.ok) {
          const data = await response.json();
          alert('User registered successfully!');
          setFormData({
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: 'user',
            agreeTerms: false,
          });
          navigate('/login');
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Error during registration:', error);
        alert('An error occurred during registration. Please try again later.');
      }
    }
  };

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  const dynamicTheme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={dynamicTheme}>
      <CssBaseline enableColorScheme />
      <SignUpContainer direction="column" justifyContent="space-between">
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
            Register
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
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
                name="username"
                value={formData.username}
                onChange={handleChange}
                id="username"
                placeholder="Enter your username"
                required
                fullWidth
                variant="outlined"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                name="email"
                value={formData.email}
                onChange={handleChange}
                id="email"
                type="email"
                placeholder="your@email.com"
                autoComplete="email"
                required
                fullWidth
                variant="outlined"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                id="password"
                placeholder="••••••"
                required
                fullWidth
                variant="outlined"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
              <TextField
                error={confirmPasswordError}
                helperText={confirmPasswordErrorMessage}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                type="password"
                id="confirmPassword"
                placeholder="••••••"
                required
                fullWidth
                variant="outlined"
              />
            </FormControl>

            <FormControlLabel
              control={<Checkbox name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} />}
              label="I agree to the terms and conditions"
            />
            {termsError && <Typography color="error">You must agree to the terms.</Typography>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
            >
              Register
            </Button>
            <Link
              component="button"
              type="button"
              onClick={() => navigate('/login')}
              variant="body2"
              sx={{ alignSelf: 'center' }}
            >
              Already have an account? Sign in
            </Link>
          </Box>
          <Divider>or</Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign up with Google')}
              startIcon={<Google />}
            >
              Sign up with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign up with Facebook')}
              startIcon={<Facebook />}
            >
              Sign up with Facebook
            </Button>
          </Box>
        </Card>
      </SignUpContainer>
    </ThemeProvider>
  );
}
