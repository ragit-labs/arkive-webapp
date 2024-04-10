import "./RecentlySavedCard.css";

interface RecentlySavedCardProps {
  banner: string;
  title: string;
  url: string;
  tags: string[];
  id: string;
  cardStyle?: React.CSSProperties;
  cardClass?: string;
  bannerStyle?: React.CSSProperties;
  bannerClass?: string;
  titleStyle?: React.CSSProperties;
  titleClass?: string;
  tagsStyle?: React.CSSProperties;
  tagsClass?: string;
  onClick: (post_id: string) => void;
}

const RecentlySavedCard: React.FC<RecentlySavedCardProps> = ({
  banner,
  title,
  tags,
  id,
  cardStyle,
  cardClass,
  bannerStyle,
  bannerClass,
  titleStyle,
  titleClass,
  tagsStyle,
  tagsClass,
  onClick,
}) => {
  return (
    <div
      className={`recently-saved-card ${cardClass ?? ""}`}
      style={{
        position: "relative",
        // display: "inline-block",
        flex: "1",
        width: "100%",
        height: "100%",
        ...cardStyle,
      }}
      onClick={() => onClick(id)}
    >
      <div
        className={bannerClass}
        style={{
          height: "65%",
          width: "100%",
          backgroundImage: "url(" + banner + ")",
          backgroundSize: "100% auto",
          borderRadius: "3px",
          ...bannerStyle,
        }}
      ></div>
      <p
        className={`recently-saved-card-title ${titleClass ?? ""}`}
        style={{ marginBottom: "0.4rem", ...titleStyle }}
      >
        {title}
      </p>
      {tags.map((tag) => {
        return (
          <span
            className={`recently-saved-card-tags ${tagsClass ?? ""}`}
            style={{ ...tagsStyle }}
          >
            {tag}
          </span>
        );
      })}
    </div>
  );
};

export default RecentlySavedCard;
