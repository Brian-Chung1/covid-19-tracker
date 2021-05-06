import React, { useState } from 'react';

const useNotification = () => {
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return [open, setOpen, handleClose];
};

export default useNotification;
