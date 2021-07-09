import React, { useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';
import { Helmet } from 'react-helmet-async';

const AdminPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    let delay = setTimeout(()=>{
      setIsLoading(false);
    }, 3000)
    return () => { clearTimeout(delay) }
  }, [])

  return (
    <>
      <Helmet>
        <title>Admin</title>
      </Helmet>
      {
        isLoading ? (
          <Typography variant="h4">
            Loading ...
          </Typography>
        ) : (
          <Typography variant="h4">
            Admin page.
          </Typography>
        )
      }
    </>
  );
};

export default AdminPage;
