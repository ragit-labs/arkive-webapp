import axios from "axios";
import React, { useEffect, useState } from "react";
import { SERVICE_URI } from "../../config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { IPost } from "../../types/post";
import "../../css/Home.css";
import PostView from "../../components/PostView";
import NavigationBar from "../../components/Navigation";

interface IPostCard {
  title: IPost["title"];
  extra_metadata: IPost["extra_metadata"];
  url: IPost["url"];
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const PostCard = ({ title, extra_metadata, url, onClick }: IPostCard) => {
  const rawUri = new URL(url);
  return (
    <div className="post-link-items" onClick={onClick}>
      <p>{title}</p>
      <p>
        {extra_metadata?.author && <span>extra_metadata?.author |</span>}{" "}
        {rawUri.hostname}
      </p>
    </div>
  );
};

const monthToString = {
  "01": "January",
  "02": "February",
  "03": "March",
  "04": "April",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "August",
  "09": "September",
  "10": "October",
  "11": "November",
  "12": "December",
};

const Home = () => {
  const [postData, setPostsData] = useState<IPost[]>([]);
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const [itemData, setItemData] = useState<IPost | null>(null);

  const removePost = (postId: string) => {
    setPostsData(postData.filter((post) => post.id !== postId));
    setItemData(null);
  };

  useEffect(() => {
    if (!loading) {
      !user && navigate("/login");
      axios.get(`${SERVICE_URI}/all`).then((response) => {
        setPostsData(response.data);
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
        <div className="home-container-inner left">
          <div className="home-search-container">
            <input />
          </div>
          <div className="home-post-link-container">
            {postData.map((data, i) => {
              const postDate = data.timestamp.split("T")[0];

              let dateHeading = null;
              if (
                i === 0 ||
                postDate !== postData[i - 1].timestamp.split("T")[0]
              ) {
                const dateParts = postDate.split("-");
                dateHeading = <h1 className="post-link-date-heading">{dateParts[2]} {monthToString[dateParts[1]]} {dateParts[1]}</h1>;
              }

              return (
                <React.Fragment key={i}>
                  {dateHeading}
                  <PostCard
                    title={data.title}
                    extra_metadata={data.extra_metadata}
                    url={data.url}
                    onClick={() => handleClick(data.id)}
                  />
                </React.Fragment>
              );
            })}
          </div>
        </div>
        <div className="home-container-inner right">
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
