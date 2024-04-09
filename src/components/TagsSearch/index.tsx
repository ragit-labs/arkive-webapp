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
  style,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div
      style={{
        position: "relative",
        height: "0",
        width: "0",
        ...style,
      }}
    >
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
      <input
        type="text"
        placeholder="Filter By Tags"
        onFocus={(e) => {
          e.target.value = "";
          setSearchTerm(e.target.value);
          setIsDropdownOpen(true);
        }}
        // onBlur={() => {
        //   setTimeout(() => setIsDropdownOpen(false), 100);
        // }}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          position: "absolute",
        }}
      />
      {isDropdownOpen && (
        <div
          style={{
            display: isDropdownOpen ? "flex" : "none",
            flexDirection: "column" ,
            position: "relative",
            marginLeft: "auto",
            marginRight: "0rem",
            top: "2rem",
            right: "0rem",
            flexWrap: "wrap",
            width: "20rem",
            backgroundColor: "#f5f5f5",
            border: "1px solid #e0e0e0",
            zIndex: 10000,
          }}
        >
          {tags
            .sort((a, b) => a.localeCompare(b))
            .filter((tag) =>
              tag.toLowerCase().includes(searchTerm.toLowerCase()),
            )
            .slice(0, 8)
            .map((tag, index) => {
              return (
                <div
                  style={{
                    padding: "0.5rem",
                    cursor: "pointer",
                    color: selectedTags.has(tag) ? "green" : "#fff",
                    borderRadius: "0.5rem",
                    margin: "0.25rem",
                    fontSize: "0.75rem",
                  }}
                  key={index}
                  onClick={() => toggleTag(tag)}
                >
                  {tagToString(tag)}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default TagsSearch;
