import axios from "axios";
import { useEffect, useState } from "react";
import { SERVICE_URI } from "../../config";
import { IPost } from "../../types/post";
import "./PostView.css";

const PostView: React.FC<{ postId: string }> = ({ postId }) => {
  const [postData, setPostData] = useState<IPost | null>(null);

  useEffect(() => {
    axios.get(`${SERVICE_URI}/get/${postId}`).then((response) => {
      console.log(response);
      setPostData(response.data);
    });
  }, [postId]);

  return (
    <>
      {postData && (
        <>
          <div className="view-container">
            <h1>{postData.title}</h1>
            <h3>
              {postData && `${postData.extra_metadata?.author} | `}
              {postData.url}
            </h3>
            <div className="tags-container">
              <span className="tags">Startups</span>
              <span className="tags">Entrepreneurship</span>
            </div>
            <div>{postData.content}</div>
            <div className="cta-container">
              <span className="cta-button cta-solid">Regenerate</span>
              <span className="cta-button">Delete</span>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PostView;
