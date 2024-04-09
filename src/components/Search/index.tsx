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
    <div
      style={{
        position: "absolute",
        height: "100%",
        width: "100%",
      }}
    >
      <div
        className="search-input-container"
        style={{
          position: "relative",
          width: "fit-content",
          height: "fit-content",
          marginLeft: "auto",
        }}
      >
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
            padding: "0.8rem",
            marginLeft: "auto",
            marginRight: "0rem",
            width: "20rem",
            borderRadius: searchItems.length > 0 ? "5px 5px 0px 0px" : "5px 5px 5px 5px"
          }}
          className="search-input"
        />
      </div>
      {searchItems.length > 0 && (
        <div
          className="search-items-container"
          style={{
            width: "100%",
          }}
        >
          <div
            className="search-items-container-inner"
            style={{
              width: "45%",
              marginLeft: "auto",
              marginRight: "0rem",
              padding: "0rem",
              border: "1px solid black",
            }}
          >
            {searchItems.map((item, index) => {
              return (
                <div
                  className="search-item"
                  style={{
                    padding: "0rem 1rem 0rem 1rem",
                  }}
                >
                  <div
                    key={index}
                    onClick={() => onItemClick(item.id)}
                    style={{
                      position: "relative",
                      display: "flex",
                      cursor: "pointer",
                      borderBottom:
                        index < searchItems.length - 1
                          ? "1px solid black"
                          : "none",
                      padding: "0.75rem 0rem 0.75rem 0rem",
                    }}
                  >
                    <img
                      style={{
                        position: "absolute",
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: "2.5rem",
                        height: "2.5rem",
                      }}
                      src={articleUriIcon}
                    />
                    <div
                      style={{
                        position: "relative",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontSize: "0.875rem",
                        marginLeft: "3rem",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "0.875rem",
                          top: "0.25rem",
                        }}
                      >
                        {item.title}
                      </p>
                      {item.tags.slice(0, 3).map((tag, tag_idx) => {
                        return (
                          <span
                            key={tag.id}
                            style={{
                              fontSize: "0.75rem",
                              top: "-0.25rem",
                            }}
                          >
                            {`#${tag.id.toLocaleLowerCase().replace(" ", "-")}`}{" "}
                            {tag_idx < 2 && (
                              <span
                                style={{
                                  position: "relative",
                                  top: "-0.2rem",
                                  fontWeight: "bolder",
                                }}
                              >
                                .
                              </span>
                            )}{" "}
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
