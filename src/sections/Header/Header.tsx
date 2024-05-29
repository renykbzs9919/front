import { useState, useEffect } from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import ThemeIcon from '@mui/icons-material/InvertColors';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

import { FlexBox } from '@/components/styled';
import { repository, title } from '@/config';
import useNotifications from '@/store/notifications';
import useSidebar from '@/store/sidebar';
import useTheme from '@/store/theme';

import { HotKeysButton } from './styled';
import { getRandomJoke } from './utils';
import { logout } from '../../api/auth'; // Asegúrate de que la ruta sea correcta

function Header() {
  const [, sidebarActions] = useSidebar();
  const [theme, themeActions] = useTheme();
  const [, notificationsActions] = useNotifications();
  const [isCookiePresent, setIsCookiePresent] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token'); // Reemplaza 'nombreDeTuCookie' con el nombre real de la cookie
    if (token) {
      setIsCookiePresent(true);
    }
  }, []);

  function showNotification() {
    notificationsActions.push({
      options: {
        variant: 'customNotification',
      },
      message: getRandomJoke(),
    });
  }

  const handleLogout = () => {
    logout();
    Swal.fire({
      icon: 'success',
      title: 'Logout Exitoso',
      text: 'Has cerrado sesión correctamente.',
    }).then(() => {
      window.location.reload();
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }} data-pw={`theme-${theme}`}>
      <AppBar color="transparent" elevation={1} position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <FlexBox sx={{ alignItems: 'center' }}>
            <IconButton
              onClick={sidebarActions.toggle}
              size="large"
              edge="start"
              color="info"
              aria-label="menu"
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
            <Button onClick={showNotification} color="info">
              {title}
            </Button>
          </FlexBox>
          <FlexBox>
            {isCookiePresent && (
              <FlexBox>
                <Tooltip title="Logout" arrow>
                  <HotKeysButton
                    size="small"
                    variant="outlined"
                    aria-label="logout"
                    onClick={handleLogout}
                  >
                    Cerrar Sesion
                  </HotKeysButton>
                </Tooltip>
              </FlexBox>
            )}
            <Divider orientation="vertical" flexItem />
            <Tooltip title="It's open source" arrow>
              <IconButton color="info" size="large" component="a" href={repository} target="_blank">
                <GitHubIcon />
              </IconButton>
            </Tooltip>
            <Divider orientation="vertical" flexItem />
            <Tooltip title="Switch theme" arrow>
              <IconButton
                color="info"
                edge="end"
                size="large"
                onClick={themeActions.toggle}
                data-pw="theme-toggle"
              >
                <ThemeIcon />
              </IconButton>
            </Tooltip>
          </FlexBox>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
