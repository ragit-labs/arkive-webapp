import axios from "axios";
import { useEffect, useState } from "react";
import { SERVICE_URI } from "../../config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { IPost } from "../../types/post";
import "../../css/Home.css";
import PostView from "../../components/PostView";
import NavigationBar from "../../components/Navigation";

const Home = () => {
  const [data, setData] = useState<IPost[]>([]);
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const [itemData, setItemData] = useState<IPost | null>(null);

  const removePost = (postId: string) => {
    setData(data.filter((post) => post.id !== postId));
    setItemData(null);
  };

  useEffect(() => {
    if(!loading) {
      !user && navigate("/login");
      axios.get(`${SERVICE_URI}/all`).then((response) => {
        setData(response.data);
      });
    }
  }, [user, loading, navigate]);

  const handleClick = async (postId: string) => {
    try {
      const response = await axios.get(`${SERVICE_URI}/get/${postId}`);
      setItemData(response.data);
    } catch (error) {
      console.error("Error fetching item data:", error);
      setItemData(null);
    }
  };
  

  return (
    <>
    <NavigationBar />
      <div className="home-container">
        <div className="home-container-inner">
          {data.map((data, i) => (
            <div
              className="post-link-items"
              key={i}
              onClick={() => handleClick(data.id)}
            >
              <p>{data.title}</p>
              <p>
                {data && `${data.extra_metadata?.author} | `}
                {data.url}
              </p>
              <p>{data.id}</p>
            </div>
          ))}
        </div>
        <div className="home-container-inner">
          {itemData ? (
            <PostView postId={itemData.id} onPostDelete={removePost} />
          ) : (
            <div>Select something plis</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
