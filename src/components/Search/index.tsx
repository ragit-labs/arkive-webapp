import { useEffect, useState } from "react";
import { IPost } from "../../types/post";
import articleUriIcon from "../../assets/images/article-icon.svg";
import "./Search.css";

interface SearchProps {
  searchItems: IPost[];
  onChange: (searchValue: string) => void;
  onItemClick: (postId: string) => void;
}

const Search: React.FC<SearchProps> = ({
  searchItems,
  onChange,
  onItemClick,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    onChange(searchTerm);
  }, [searchTerm]);

  return (
    <div className="search-container">
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Quick Find"
          onFocus={(e) => {
            e.target.value = "";
            setSearchTerm(e.target.value);
          }}
          onBlur={(e) => {
            setTimeout(() => {
              e.target.value = "";
              setSearchTerm("");
            }, 100);
          }}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            borderRadius: searchItems.length > 0 ? "3px 3px 0px 0px" : "3px",
          }}
          className="search-input"
        />
      </div>
      {searchItems.length > 0 && (
        <div className="search-items-container">
          <div className="search-items-container-inner">
            {searchItems.map((item, index) => {
              return (
                <div className="search-item">
                  <div
                    className="search-item-inner"
                    key={index}
                    onClick={() => onItemClick(item.id)}
                    style={{
                      borderBottom:
                        index < searchItems.length - 1
                          ? "1px solid #D9D9D9"
                          : "none",
                    }}
                  >
                    <img className="search-item-icon" src={articleUriIcon} />
                    <div className="search-item-text-container">
                      <p className="search-item-title">{item.title}</p>
                      {item.tags.slice(0, 3).map((tag, tag_idx) => {
                        return (
                          <span className="search-item-tag" key={tag.id}>
                            {`#${tag.id.toLocaleLowerCase().replace(" ", "-")}`}{" "}
                            {tag_idx < 2 && <span>.</span>}{" "}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
