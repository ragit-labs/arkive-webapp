import axios from "axios";
import React, { useEffect, useState } from "react";
import { SERVICE_URI, WEBAPP_URI } from "../../config";
import { IPost } from "../../types/post";
import Markdown from "react-markdown";
import "./PostView.css";

const PostView: React.FC<{
  postId: string;
  onPostDelete?: (postId: string) => void;
}> = ({ postId, onPostDelete }) => {
  const [postData, setPostData] = useState<IPost | null>(null);
  const [postUrl, setPostUrl] = useState<string | null>(null);

  useEffect(() => {
    axios.get(`${SERVICE_URI}/get/${postId}`).then((response) => {
      setPostData(response.data);
      const postUrlRaw = new URL(response.data.url);
      setPostUrl(postUrlRaw.hostname);
    });
  }, [postId]);

  const deletePost = () => {
    if (onPostDelete)
      axios
        .post(`${SERVICE_URI}/delete`, { post_id: postId })
        .then((response) => {
          if (response.data.success) {
            setPostData(null);
            onPostDelete(postId);
          }
        });
  };

  const copyToClipboard = () => {
    const postUri = `${WEBAPP_URI}/view/${postId}`;
    navigator.clipboard.writeText(postUri).then(() => {
      alert("Copied to clipboard");
    });
  };

  return (
    <>
      {postData && (
        <div className="view-container">
          <div className="view-container-header">
            <h1 style={{ textAlign: "center" }}>{postData.title}</h1>
            <h3 style={{ textAlign: "center", fontSize: "0.9rem" }}>
              {/* {postData && `${postData.extra_metadata?.author} | `} */}
              {postUrl}
            </h3>
            <div className="tags-container">
              {postData.tags.map((tag, index) => (
                <span key={index} className="tags">
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
          <div className="view-container-content">
            <div className="padding">
              <Markdown>{postData.content}</Markdown>
              <Markdown>{postData.content}</Markdown>
              <Markdown>{postData.content}</Markdown>
              <Markdown>{postData.content}</Markdown>
              <Markdown>{postData.content}</Markdown>
              <Markdown>{postData.content}</Markdown>
            </div>
            <div className="cta-container">
              <span className="cta-button" onClick={() => deletePost()}>
                Delete
              </span>
              <span className="cta-button" onClick={copyToClipboard}>
                Share
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostView;
