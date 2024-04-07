import axios from "axios";
import React, { useEffect, useState } from "react";
import { SERVICE_URI } from "../../config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { IPost } from "../../types/post";
import "./Home.css";
import PostView from "../../components/PostView";
import NavigationBar from "../../components/Navigation";
import { dateTimePretty } from "../../utils/datetime";

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
      axios
        .post(`${SERVICE_URI}/all`, {
          sort: {
            field: "timestamp",
            direction: "desc",
          },
        })
        .then((response) => {
          setPostsData(response.data);
        });
    }
  }, [user, loading, navigate]);

  const viewPost = async (postId: string) => {
    try {
      const response = await axios.get(`${SERVICE_URI}/get/${postId}`);
      setItemData(response.data);
    } catch (error) {
      console.error("Error fetching item data:", error);
      setItemData(null);
    }
  };

  const viewPostRedirect = (postId: string) => {
    navigate(`/view/${postId}`);
  }

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
                dateHeading = (
                  <p className="post-link-date-heading">
                    {dateTimePretty(data.timestamp)}
                  </p>
                );
              }

              return (
                <React.Fragment key={i}>
                  {dateHeading}
                  <PostCard
                    title={data.title}
                    extra_metadata={data.extra_metadata}
                    url={data.url}
                    onClick={() => viewPost(data.id)}
                  />
                </React.Fragment>
              );
            })}
          </div>
        </div>
        <div className="post-viewer-container" style={{display: "block"}}>
          {itemData && (
            <PostView postId={itemData.id} onPostDelete={removePost} />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
