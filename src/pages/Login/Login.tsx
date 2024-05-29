import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { login } from '../../api/auth'; // Importa la función de login de tu API
import Swal from 'sweetalert2'; // Importa SweetAlerts

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Hacer la solicitud HTTP para iniciar sesión
      const response = await login(email, password); // Suponiendo que login() es una función de tu API que toma un email y una contraseña

      // Manejar la respuesta exitosa
      console.log('Login successful:', response.data.message);
      // Mostrar SweetAlert de éxito
      Swal.fire({
        icon: 'success',
        title: 'Login Exitoso',
        text: response.data.message || 'Has iniciado sesión correctamente.',
      });
      // Aquí podrías redirigir al usuario a otra página

    } catch (error) {
      // Manejar el error
      console.error('Error logging in:', error);
      setError('Error logging in. Please try again.'); // Podrías mostrar un mensaje de error al usuario
      // Mostrar SweetAlert de error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Ocurrió un error al iniciar sesión.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://t3.ftcdn.net/jpg/04/59/93/74/360_F_459937444_PyTfMkivTC8RD76hPiMzjLvMPFi0FO9J.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'dark' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} elevation={6}>
        <div
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" align='center'>
            Iniciar Sesión
          </Typography>
          <form onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Ingrese Correo"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              //autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ bgcolor:'blue', mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar'}
            </Button>
            {error && (
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            )}
            <Grid container justifyContent="center">
              <Grid item xs>
                <Link href="#" variant="body1">
                  ¿Has olvidado tu contraseña?
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default Login;
