import React from "react";
import PostForm from "src/shared/components/post-form";

const sections = [
  { id: 1, name: "test1" },
  { id: 2, name: "test2" },
  { id: 3, name: "test3" },
  { id: 4, name: "test2" },
];

const Home: React.FC<{}> = () => {
  return <div><PostForm sections={sections} /></div>;
};

export default Home;
