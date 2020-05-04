import React from 'react';
import { Typography } from '@material-ui/core';

export function Footer() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }