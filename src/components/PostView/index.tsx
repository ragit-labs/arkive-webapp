import axios from "axios";
import React, { useEffect, useState } from "react";
import { SERVICE_URI, WEBAPP_URI } from "../../config";
import { IPost } from "../../types/post";
import "./PostView.css";
import { useAuth } from "../../context/AuthContext";
import { dateTimePretty } from "../../utils/datetime";
import uriIcon from "../../assets/images/uri-icon.svg";
import { TextEditor } from "../TextEditor";
import { useNavigate } from "react-router-dom";

const PostView: React.FC<{
  postId: string;
  onPostDelete?: (postId: string) => void;
  onClosePost?: () => void;
}> = ({ postId, onPostDelete, onClosePost }) => {
  const [postData, setPostData] = useState<IPost | null>(null);
  const [postUrl, setPostUrl] = useState<string | null>(null);
  const [postContent, setPostContent] = useState<string | null>(null);
  const [postTitle, setPostTitle] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<string | null>(null);

  const isDesktop = window.innerWidth >= 1200;

  const [readOnly, setreadOnly] = useState<boolean>(true);

  const [discard, setDiscard] = useState<boolean>(true);

  const { user } = useAuth();

  const navigate = useNavigate();

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
  }, [postContent]);

  const searchTag = (tag: string) => {
    navigate(`/?tags=${tag}`);
    setPostData(null);
    onClosePost && onClosePost();
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
    const newPostTitle =
      document.getElementsByClassName("post-title")[0].textContent;
    if (editedContent === postContent && postTitle === newPostTitle) return;
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
  };

  const getUpdatedPost = (content: string) => {
    setEditedContent(content);
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
          <div className="view-container-body">
            <div className="view-container-header">
              {postTitle && (
                <div
                  className="post-title"
                  contentEditable={!readOnly}
                  style={{ border: !readOnly ? "1px dashed black" : "none" }}
                >
                  {postData.title}
                </div>
              )}
              {(!isDesktop || postData.user_id !== user?.id) && (
                <>
                  <a className="post-url" href={postData.url} target="_blank">
                    {postUrl}
                  </a>
                  <div className="tags-container">
                    {postData.tags.map((tag, index) => (
                      <span key={index} className="tags">
                        #{tag.id}
                      </span>
                    ))}
                  </div>
                </>
              )}
              {!isDesktop && (
                <p className="post-save-date">
                  Saved on{" "}
                  <span style={{ fontWeight: 600 }}>
                    {dateTimePretty(postData.timestamp)}
                  </span>
                </p>
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
                    <span
                      key={index}
                      onClick={() => searchTag(tag.id)}
                      className="tags-side"
                    >
                      #{tag.id}
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
                <span onClick={() => onPostDelete && onPostDelete(postId)}>
                  Delete
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
