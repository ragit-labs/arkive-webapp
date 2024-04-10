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
  titleClass,
  tagsStyle,
  tagsClass,
  onClick,
}) => {
  return (
    <div
      className={`recently-saved-card ${cardClass ?? ""}`}
      style={cardStyle}
      onClick={() => onClick(id)}
    >
      <div
        className="recently-saved-card-banner"
        style={{
          backgroundImage: "url(" + banner + ")",
        }}
      ></div>
      <p className={`recently-saved-card-title ${titleClass ?? ""}`}>{title}</p>
      {tags.map((tag) => {
        return (
          <span
            className={`recently-saved-card-tags ${tagsClass ?? ""}`}
            style={tagsStyle}
          >
            {tag}
          </span>
        );
      })}
    </div>
  );
};

export default RecentlySavedCard;
