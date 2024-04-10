import { useState } from "react";
import { tagToString } from "../../utils/misc";

interface TagsSearchProps {
  tags: string[];
  selectedTags: Set<string>;
  toggleTag: (tag: string) => void;
  style?: React.CSSProperties;
}

const TagsSearch: React.FC<TagsSearchProps> = ({
  tags,
  selectedTags,
  toggleTag,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTagsCount, setCurrentTagsCount] = useState(8);

  return (
    <div>
      {/* <div
        style={{
          display: "flex",
        }}
      >
        {Array.from(selectedTags).map((tag, index) => (
          <div
            style={{
              display: "flex",
            }}
          >
            <span key={index}>{tag}</span>
            <div onClick={() => toggleTag(tag)}>x</div>
          </div>
        ))}
      </div> */}
      <p
        style={{
          fontSize: "0.9rem",
          color: "#000",
          marginBottom: "1rem",
          fontWeight: "bold",
        }}
      >
        Filter By Tags
      </p>
      <input
        placeholder="Search Tags"
        style={{
          position: "relative",
          marginBottom: "1rem",
        }}
        onFocus={(e) => {
          e.target.value = "";
          setSearchTerm(e.target.value);
        }}
        // onBlur={() => {
        //   setTimeout(() => setIsDropdownOpen(false), 100);
        // }}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div>
        {tags
          .sort((a, b) => a.localeCompare(b))
          .filter((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
          .slice(0, currentTagsCount)
          .map((tag, index) => {
            return (
              <span
                className="tag-search-item"
                style={{
                  display: "block",
                  cursor: "pointer",
                  color: selectedTags.has(tag) ? "#000000" : "#6B6D71",
                  borderRadius: "0.5rem",
                  marginBottom: "0.5rem",
                  fontSize: "0.8rem",
                  fontWeight: selectedTags.has(tag) ? "bold" : "normal",
                }}
                key={index}
                onClick={() => toggleTag(tag)}
              >
                {tagToString(tag)}
              </span>
            );
          })}
        {currentTagsCount < tags.length && (
          <span
            style={{
              cursor: "pointer",
              fontSize: "0.7rem",
            }}
            onClick={() => {
              setCurrentTagsCount(currentTagsCount + 8);
            }}
          >
            Show More
          </span>
        )}
      </div>
    </div>
  );
};

export default TagsSearch;
