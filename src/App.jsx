import { useState, useEffect } from "react";
import axios from "axios";
import Home from "./Components/Home";
import "./Styles.css";

function App() {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      const data = response.data;
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <Home />
    </div>
  );
}

export default App;
