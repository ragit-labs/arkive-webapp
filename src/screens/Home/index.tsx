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

      fetchPosts(0, tags.size === 0 ? 4 : 0, Array.from(tags)).then((data) => {
        setPostsData(data);
        console.log(tags);
        setSelectedTags(new Set(tags));
      });

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
        className="header-container fixed w-full"
        style={{
          width: "86%",
          left: "8%",
          height: "3rem",
          zIndex: 999,
        }}
      >
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
        className="home-container"
        style={{ 
          // overflowY: itemData ? "hidden" : "auto" 
          position: "relative",
        }}
      >
        <div className="recently-saved-contaier" style={{ display: "flex" }}>
          <p className="recently-saved-heading">Recently Saved</p>
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
                }}
                onClick={() => viewPost(data.id)}
              />
            );
          })}
        </div>
        <div className="tags-search-container" style={{}}>
        <TagsSearch
          tags={tags}
          selectedTags={selectedTags}
          toggleTag={toggleTag}
        />
        </div>
        <div className="home-container-inner">
          <div className="home-post-link-container">
            {postData.map((data, i) => {
              const postDate = data.timestamp.split("T")[0];

              let dateHeading = null;
              if (
                selectedTags.size == 0 && (i === 0 ||
                postDate !== postData[i - 1].timestamp.split("T")[0])
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
                        (tag) => `#${tag.id.toLowerCase().replace(" ", "-")}`,
                      )}
                    id={data.id}
                    onClick={() => viewPost(data.id)}
                  />
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
      <div
        className="post-viewer-container"
        style={{ display: itemData ? "block" : "none" }}
      >
        <div className="post-viewer-bg" onClick={closePost}></div>
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
