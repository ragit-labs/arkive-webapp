import axios from "axios";
import React, { useEffect, useState } from "react";
import { SERVICE_URI, WEBAPP_URI } from "../../config";
import { IPost } from "../../types/post";
import "./PostView.css";

const PostView: React.FC<{
  postId: string;
  onPostDelete?: (postId: string) => void;
}> = ({ postId, onPostDelete }) => {
  const [postData, setPostData] = useState<IPost | null>(null);

  useEffect(() => {
    axios.get(`${SERVICE_URI}/get/${postId}`).then((response) => {
      setPostData(response.data);
    });
  }, [postId]);

  const deletePost = () => {
    if(onPostDelete)
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
        <>
          <div className="view-container">
            <h1>{postData.title}</h1>
            <h3>
              {/* {postData && `${postData.extra_metadata?.author} | `} */}
              {postData.url}
            </h3>
            <div className="tags-container">
              {postData.tags.map((tag, index) => (
                <span key={index} className="tags">{tag.name}</span>
              ))}
            </div>
            <div>{postData.content}</div>
            <div className="cta-container">
              <span className="cta-button cta-solid">Regenerate</span>
              <span className="cta-button" onClick={() => deletePost()}>
                Delete
              </span>
              <span className="cta-button" onClick={copyToClipboard}>
                Share
              </span>
            </div>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
        </>
      )}
    </>
  );
};

export default PostView;
