import { useNavigate } from "react-router-dom";

interface PostCardProp {
  banner: string;
  content: string;
  id: string;
}

const PostCard: React.FC<PostCardProp> = ({ banner, content, id }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        onClick={() => navigate(`/view/${id}`)}
        className="post-card"
        style={{
          top: "0",
          position: "relative",
          margin: "1vw",
          backgroundImage: "url(" + banner + ")",
          width: "30vw",
        }}
      >
        <p>{content}</p>
      </div>
    </>
  );
};

export default PostCard;
