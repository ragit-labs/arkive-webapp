import axios from "axios";
import React, { useEffect, useState } from "react";
import { SERVICE_URI, WEBAPP_URI } from "../../config";
import { IPost } from "../../types/post";
import "./PostView.css";
import { useAuth } from "../../context/AuthContext";
import { dateTimePretty } from "../../utils/datetime";
import uriIcon from "../../assets/images/uri-icon.svg";
import { TextEditor } from "../TextEditor";

const PostView: React.FC<{
  postId: string;
  onPostDelete?: (postId: string) => void;
}> = ({ postId, onPostDelete }) => {
  const [postData, setPostData] = useState<IPost | null>(null);
  const [postUrl, setPostUrl] = useState<string | null>(null);
  const [postContent, setPostContent] = useState<string | null>(null);
  const [postTitle, setPostTitle] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<string | null>(null);
  
  const [readOnly, setreadOnly] = useState<boolean>(true);
  
  const [discard, setDiscard] = useState<boolean>(true);
  
  const { user } = useAuth();
  
  useEffect(() => {
    axios.get(`${SERVICE_URI}/get/${postId}`).then((response) => {
      setPostData(response.data);
      setPostContent(response.data.content);
      setPostTitle(response.data.title);
      const postUrlRaw = new URL(response.data.url);
      let hostName = postUrlRaw.hostname;
      if ("www." === hostName.substring(0, 4)) {
        hostName = hostName.substring(4);
      }
      setPostUrl(hostName);
    });
  }, [postId]);

  useEffect(() => {
    setEditedContent(postContent);
  }, [postContent])

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

  const editPost = () => {
    setreadOnly(false);
  };

  const discardEdit = () => {
    setreadOnly(true);
    setDiscard(!discard);
    document.getElementsByClassName("post-title")[0].textContent = postTitle;
  };

  const saveUpdatedPost = () => {
    setreadOnly(true);
    const newPostTitle = document.getElementsByClassName("post-title")[0].textContent;
    if(editedContent === postContent && postTitle === newPostTitle) return;
    const updatedPost = {
      post_id: postId,
      title: newPostTitle,
      content: editedContent,
    };
    axios.post(`${SERVICE_URI}/update`, updatedPost).then((response) => {
      if (response.data.success) {
        setreadOnly(true);
      }
    });
  }

  const getUpdatedPost = (content: string) => {
    setEditedContent(content);
  }

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
          <div className="view-container-body">
            <div className="view-container-header">
              {postTitle && <div className="post-title" contentEditable={!readOnly} style={{border: !readOnly ? "1px dashed black" : "none"}}>{postData.title}</div>}
              {postData.user_id !== user?.id && (
                <>
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
                </>
              )}
            </div>
            <div className="view-container-content">
              <div
                className="editor-container"
                style={{ letterSpacing: 0, lineHeight: 1.5 }}
              >
                {postContent && (
                  <TextEditor
                    readOnly={readOnly}
                    discard={discard}
                    updateCallback={getUpdatedPost}
                    stringComponent={postData.content}
                  />
                )}
              </div>
            </div>
          </div>
          {postData.user_id === user?.id && (
            <div className="view-container-side">
              <div className="cta-container">
                <div
                  className="cta-url-container"
                  onClick={() => window.open(postData.url, "_blank")}
                >
                  <img className="uri-icon" src={uriIcon} />
                  {postUrl}
                </div>
                <div className="tags-container-side">
                  {postData.tags.map((tag, index) => (
                    <span key={index} className="tags-side">
                      {tag.name}
                    </span>
                  ))}
                  <span className="tags-side">+</span>
                </div>
                <p className="post-save-date">
                  Saved on{" "}
                  <span style={{ fontWeight: 600 }}>
                    {dateTimePretty(postData.timestamp)}
                  </span>
                </p>

                <span
                  className="action-button-primary no-edit-mode"
                  style={{ display: readOnly ? "inline-block" : "none" }}
                  onClick={copyToClipboard}
                >
                  Share
                </span>
                <span
                  className="action-button-primary edit-mode"
                  style={{ display: !readOnly ? "inline-block" : "none" }}
                  onClick={saveUpdatedPost}
                >
                  Save
                </span>

                <span
                  className="action-button-secondary no-edit-mode"
                  style={{ display: readOnly ? "inline-block" : "none" }}
                  onClick={editPost}
                >
                  Edit
                </span>
                <span
                  className="action-button-secondary edit-mode"
                  style={{ display: !readOnly ? "inline-block" : "none" }}
                  onClick={discardEdit}
                >
                  Discard Changes
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PostView;
