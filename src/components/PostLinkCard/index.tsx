import uriIcon from "../../assets/images/uri-icon.svg";
import "./PostLinkCard.css";

interface PostLinkCardProps {
  title: string;
  url: string;
  tags: string[];
  id: string;
  cardStyle?: React.CSSProperties;
  cardClass?: string;
  titleStyle?: React.CSSProperties;
  titleClass?: string;
  tagsStyle?: React.CSSProperties;
  tagsClass?: string;
  onClick: (post_id: string) => void;
}

const PostLinkCard: React.FC<PostLinkCardProps> = ({
  title,
  tags,
  id,
  url,
  cardStyle,
  cardClass,
  titleStyle,
  titleClass,
  tagsStyle,
  tagsClass,
  onClick,
}) => {
  return (
    <div
      className={cardClass}
      style={{
        position: "relative",
        width: "100%",
        borderBottom: "1px solid #e0e0e0",
        padding: "0rem 0rem 1rem 0.75rem",
        cursor: "pointer",
        ...cardStyle,
      }}
      onClick={() => onClick(id)}
    >
      <div style={{ width: "80%" }}>
        <p
          className={`post-link-card-title ${titleClass ?? ""}`}
          style={{ ...titleStyle }}
        >
          {title}
        </p>
        {tags.map((tag) => {
          return (
            <span
              className={`post-link-card-tags ${tagsClass ?? ""}`}
              style={{ ...tagsStyle }}
            >
              {tag}
            </span>
          );
        })}
      </div>
      <a
        href={url}
        style={{
          width: "1.875rem",
          height: "1.875rem",
          position: "absolute",
          right: "0.75rem",
          top: "10%",
        }}
        target="_blank"
      >
        <img style={{ width: "100%", height: "100%" }} src={uriIcon} />
      </a>
    </div>
  );
};

export default PostLinkCard;
