import { useParams } from "react-router-dom";
import PostView from "../../components/PostView";

const View = () => {
  const { postId } = useParams();

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        top: "100px",
        marginBottom: "100px",
      }}
    >
      {postId && <PostView postId={postId}/>}
    </div>
  );
};

export default View;
