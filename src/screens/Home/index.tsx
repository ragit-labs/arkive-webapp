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
import RecentlySavedCard from "../../components/RecentlySavedCard";
import PostLinkCard from "../../components/PostLinkCard";

interface ICard {
  title: IPost["title"];
  extra_metadata: IPost["extra_metadata"];
  url: IPost["url"];
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

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

  const closePost = async () => {
    setItemData(null);
  };

  return (
    <>
      <NavigationBar />
      <div
        className="home-container"
        style={{ overflow: itemData ? "hidden" : "auto" }}
      >
        <div className="recently-saved-contaier" style={{ display: "flex" }}>
          <p className="recently-saved-heading">Recently Saved</p>
          {postData.slice(0, 4).map((data, i) => {
            return (
              <RecentlySavedCard
                key={i}
                title={data.title}
                url={data.url}
                banner={
                  "https://plus.unsplash.com/premium_photo-1710631508215-61d51dcacfb6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                id={data.id}
                tags={data.tags
                  .slice(0, 3)
                  .map(
                    (tag) =>
                      `#${tag.name.toLocaleLowerCase().replace(" ", "-")}`,
                  )}
                cardStyle={{
                  width: "17.5rem",
                  height: "14.25rem",
                }}
                onClick={() => viewPost(data.id)}
              />
            );
          })}
        </div>
        <div className="home-container-inner left">
          <div className="home-post-link-container">
            {postData.slice(4).map((data, i) => {
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
                  <PostLinkCard
                    title={data.title}
                    url={data.url}
                    tags={data.tags
                      .slice(0, 3)
                      .map(
                        (tag) => `#${tag.name.toLowerCase().replace(" ", "-")}`,
                      )}
                    id={data.id}
                    onClick={() => viewPost(data.id)}
                  />
                </React.Fragment>
              );
            })}
          </div>
        </div>
        <div
          className="post-viewer-container"
          style={{ display: itemData ? "block" : "none" }}
        >
          <div className="post-viewer-bg" onClick={closePost}></div>
          <div className="post-viewer">
            {itemData && (
              <PostView postId={itemData.id} onPostDelete={removePost} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
