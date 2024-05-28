import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import { registerRequest } from '../../api/auth';
import Swal from 'sweetalert2';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirm, setPasswordConfirm] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Envía la solicitud de registro al backend
      const response = await registerRequest({ name, email, password, password_confirm,role });
      // Si el registro es exitoso, muestra una alerta de éxito
      Swal.fire({
        icon: 'success',
        title: 'Registro Exitoso!',
        text: 'Se ha registrado exitosamente.',
      });
      // Manejar el éxito del registro (redirigir, mostrar mensaje, etc.)
      console.log('Registration successful:', response.data);
      navigate('/');
    } catch (err: any) {
      // Si hay un error, muestra una alerta de error
      console.error('Error in SweetAlert:', err); // Agrega esta línea para ver el error en la consola
      Swal.fire({
        icon: 'error',
        title: '¡Registro fallido!',
        text: err.response?.data?.message || 'An error occurred during registration.',
      });
      //setError(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <>
      <Meta title="Register" />
      <FullSizeCenteredFlexBox flexDirection="column">
        <Typography variant="h3">Register</Typography>
        <form onSubmit={handleRegister}>
          <TextField
            type="text"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            type="password"
            label="Password Confirm"
            value={password_confirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              label="Role"
            >
              <MenuItem value="">Elija el Cargo: </MenuItem>
              <MenuItem value="usuario">Cliente</MenuItem>
              <MenuItem value="administrador">Encargado</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="outlined"
            sx={{ mt: 4 }}
            size="small"
            color="warning"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </Button>
          {error && <Typography variant="body2" color="error">{error}</Typography>}
        </form>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default Register;
