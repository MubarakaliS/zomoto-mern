import React from "react";
import Wallpaper from "./Wallpaper";
import QuickSearch from "./QuickSearch";
import Carousels from "./Carousel";

import TabsForm from "./Tabs";
import Header from "./Header";
import Wallpaper2 from "./Wallpaper2";
const Home = () => {
  sessionStorage.clear();
  return (
    <>
      <Wallpaper />
      <QuickSearch />
    </>
  );
};

export default Home;
