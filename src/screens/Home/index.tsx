import axios from "axios";
import PostCard from "../../components/Card";
import { useEffect, useState } from "react";

const Home = () => {
  const url = "http://localhost:8000";

  const [data, setData] = useState([]);

  const fetchInfo = async () => {
    axios.get(`${url}/all`).then((response) => setData(response.data));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const cards = data.map(({ banner, description }) => (
    <PostCard banner={banner} description={description} />
  ));
  return <>{cards}</>;
};

export default Home;
