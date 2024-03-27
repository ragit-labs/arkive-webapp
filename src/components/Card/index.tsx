interface PostCardProp {
  banner: string;
  description: string;
}

const PostCard: React.FC<PostCardProp> = ({ banner, description }) => {
  return (
    <>
      <div
        className="post-card"
        style={{
          top: "0",
          position: "relative",
          margin: "1vw",
          backgroundImage: "url(" + banner + ")",
          width: "30vw",
        }}
      >
        <p>{description}</p>
      </div>
    </>
  );
};

export default PostCard;
