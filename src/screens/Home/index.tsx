import axios from "axios";
import React, { useEffect, useState } from "react";
import { SERVICE_URI } from "../../config";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { IPost } from "../../types/post";
import "./Home.css";
import PostView from "../../components/PostView";
import { dateTimePretty } from "../../utils/datetime";
import RecentlySavedCard from "../../components/RecentlySavedCard";
import PostLinkCard from "../../components/PostLinkCard";
import TagsSearch from "../../components/TagsSearch";
import Search from "../../components/Search";
import "../../index.css";

const fetchPosts = async (skip?: number, limit?: number, tags?: string[]) => {
  const response = await axios.post(`${SERVICE_URI}/all`, {
    sort: {
      field: "timestamp",
      direction: "desc",
    },
    skip,
    limit,
    tags,
  });
  return response.data;
};

const Home = () => {
  const [recentlySavedData, setRecentlySavedData] = useState<IPost[]>([]);
  const [postData, setPostsData] = useState<IPost[]>([]);
  const [itemData, setItemData] = useState<IPost | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<Set<string>>(
    new Set<string>(),
  );
  const [searchItems, setSearchItems] = useState<IPost[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const { user, loading: userLoading } = useAuth();
  const navigate = useNavigate();

  const isDesktop = window.innerWidth > 1200;

  useEffect(() => {
    if (!userLoading) {
      !user && navigate("/login");

      let tags = new Set<string>();

      if (searchParams.get("tags")) {
        tags = new Set(searchParams.get("tags")?.split(",") ?? []);
      }

      fetchPosts(0, 4).then((data) => {
        setRecentlySavedData(data);
      });

      fetchPosts(tags.size === 0 ? 4 : 0, 100, Array.from(tags)).then(
        (data) => {
          setPostsData(data);
          console.log(tags);
          setSelectedTags(new Set(tags));
        },
      );

      axios.post(`${SERVICE_URI}/all_tags`).then((response) => {
        setTags(response.data.map((tag: { id: string }) => tag.id));
      });
    }
  }, [user, userLoading, navigate, searchParams]);

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

  const removePost = (postId: string) => {
    setPostsData(postData.filter((post) => post.id !== postId));
    setItemData(null);
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.has(tag)) {
      selectedTags.delete(tag);
    } else {
      selectedTags.add(tag);
    }
    if (selectedTags.size === 0) {
      setSearchParams({});
    } else {
      setSearchParams({
        tags: Array.from(selectedTags).join(","),
      });
    }
  };

  const searchPosts = async (searchValue: string) => {
    if (searchValue.length < 4) {
      setSearchItems([]);
    } else {
      axios
        .post(`${SERVICE_URI}/search`, {
          keyword: searchValue,
        })
        .then((response) => {
          setSearchItems(response.data);
        });
    }
  };

  return (
    <>
      <div
        className="header-container"
        style={{
          position: "fixed",
          width: "100%",
          left: "0",
          top: "0",
          zIndex: 10,
          backgroundColor: "#fff",
        }}
      >
        <p
          style={{
            display: isDesktop ? "block" : "none",
            position: "relative",
            marginTop: "1rem",
            fontSize: "1.5rem",
            left: "0",
          }}
        >
          lightcone
        </p>
        <div
          className="search-container"
          style={{
            position: "relative",
          }}
        >
          <Search
            searchItems={searchItems}
            onChange={searchPosts}
            onItemClick={viewPost}
          />
        </div>
      </div>
      <div
        className="recently-saved-contaier"
        style={{
          display: "flex",
          flexDirection: "row",
          width: "88%",
          left: "6%",
          top: "10rem",
          padding: "3rem 1rem 5rem 1rem",
          justifyContent: "space-between",
          borderBottom: "1px solid #D9D9D9",
        }}
      >
        <p
          className="recently-saved-heading"
          style={{
            position: "absolute",
            top: "0",
            fontWeight: "500",
          }}
        >
          Recently Saved
        </p>
        {recentlySavedData.map((data, i) => {
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
                  (tag) => `#${tag.id.toLocaleLowerCase().replace(" ", "-")}`,
                )}
              cardStyle={{
                width: "17.5rem",
                height: "14.25rem",
                marginLeft: i === 0 ? "0" : "0.75rem",
              }}
              onClick={() => viewPost(data.id)}
            />
          );
        })}
      </div>
      <div
        className="tags-search-container"
        style={{
          position: "absolute",
          top: "36rem",
          left: "8%",
          borderRight: "1px solid #D9D9D9",
        }}
      >
        <TagsSearch
          tags={tags}
          selectedTags={selectedTags}
          toggleTag={toggleTag}
        />
      </div>
      <div
        className="home-container"
        style={{
          position: "relative",
          top: "13rem",
          left: "22%",
          width: "70%",
        }}
      >
        <div>
          {postData.map((data, i) => {
            const postDate = data.timestamp.split("T")[0];

            let dateHeading = null;
            if (
              selectedTags.size == 0 &&
              (i === 0 || postDate !== postData[i - 1].timestamp.split("T")[0])
            ) {
              dateHeading = (
                <p
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: "500",
                    marginBottom: "3rem 0rem 3rem 0.6rem",
                  }}
                >
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
                    .map((tag) => `#${tag.id.toLowerCase().replace(" ", "-")}`)}
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
        style={{
          display: itemData ? "block" : "none",
          position: "fixed",
          zIndex: 50,
          top: "0",
          left: "0",
          width: "100vw",
          overflow: "scroll",
        }}
      >
        <div
          className="post-viewer-bg"
          onClick={closePost}
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(25, 25, 25, 0.14)",
            backdropFilter: "blur(20px)",
          }}
        ></div>
        <div className="post-viewer-container-inner">
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
