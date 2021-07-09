import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Typography } from '@material-ui/core';
import CONFIGS from "../../consts/CONFIGS";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta property="og:title" content="Home page"/>
        <meta property="og:description" content="Server-side rendering for create react app. Lorem ipsum dolor sit amet posuere, congue massa"/>
        <meta property="og:image" content = {`${CONFIGS.ROOT_URL}/ssr.png`}/>
        <meta name="twitter:card" content="Home page"/>
        <meta property="og:site_name" content="Server-side rendering for create react app"/>
      </Helmet>
      <div>
      <Typography variant="h4">Home page</Typography>
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non eros eu velit consectetur feugiat.
        Suspendisse condimentum augue tortor, non faucibus massa sodales et. Donec at erat pretium, sagittis enim
        posuere, congue massa.
        Aliquam dapibus metus justo, quis fringilla metus consectetur a. Sed ornare volutpat nibh, euismod rutrum ante
        bibendum eget.
        Cras suscipit odio ac libero feugiat suscipit. Nullam purus urna, pharetra ac felis id, vehicula volutpat felis.
        Nullam a magna euismod, porttitor dolor placerat, viverra nibh. Aliquam sed accumsan eros, ac tempus erat.
        Praesent vehicula sapien nec arcu sodales, et condimentum mi elementum. In efficitur sapien vitae luctus
        volutpat.
        Suspendisse interdum rhoncus dolor nec tincidunt. Phasellus pellentesque ipsum non diam bibendum ullamcorper.
        Aliquam ultricies fringilla feugiat. Morbi ultricies sed dolor id accumsan.
      </Typography>
    </div>
    </>
  );
};

export default HomePage;
