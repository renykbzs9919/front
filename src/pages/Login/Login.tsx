import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import { login } from '../../api/auth';
import Swal from 'sweetalert2';
import Cookies from "js-cookie";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await login({ email, password });

      console.log('Login successful:', response.data);

      localStorage.setItem('token', response.data.jwt);
      Cookies.set('token', response.data.jwt, { expires: 1 });

      Swal.fire({
        icon: 'success',
        title: 'Login Exitoso',
        text: response.data.message || 'Has iniciado sesión correctamente.',
      });

      if (Cookies.get('token')) {
        navigate('/');
      }
    } catch (err: any) {
      Swal.fire({
        icon: 'error',
        title: 'Login Erroneo',
        text: err.response?.data?.message || 'Ocurrió un error al iniciar sesión.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Meta title="Login" />
      <FullSizeCenteredFlexBox flexDirection="column">
        <Typography variant="h3">Login</Typography>
        <form onSubmit={handleLogin}>
          <TextField
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            variant="outlined"
            sx={{ mt: 4 }}
            size="small"
            color="warning"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
          {error && <Typography variant="body2" color="error">{error}</Typography>}
        </form>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Dont have an account? <Link to="/register">Register</Link>
        </Typography>
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default Login;
