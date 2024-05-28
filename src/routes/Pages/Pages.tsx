import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import routes from '..';
import { getPageHeight } from './utils';

function Pages() {
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token;
  };

  return (
    <Box sx={{ height: (theme) => getPageHeight(theme) }}>
      <Routes>
        {Object.values(routes).map(({ path, component: Component, isProtected }) => (
          <Route
            key={path}
            path={path}
            element={
              !isProtected || isAuthenticated() ? <Component /> : <Navigate to="/" />
            }
          />
        ))}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Box>
  );
}

export default Pages;
