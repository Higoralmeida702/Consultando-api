import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
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

  return;
  <div></div>;
}

export default App;
