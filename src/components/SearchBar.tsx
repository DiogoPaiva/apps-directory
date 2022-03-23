import React, { useState } from "react";
import SearchIcon from "../assets/icons/icons-search.svg";
import CloseIcon from "../assets/icons/icons-close.svg";

interface ISearchBarProps {
  value?: string;
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
  onChange(value: string): void;
}

const SearchBar: React.FunctionComponent<ISearchBarProps> = (
  props: ISearchBarProps
) => {
  const { onChange, placeholder, maxLength, disabled } = props;

  // Clear Input text on click
  const [inputText, setInputText] = useState<string>("");
  const clearInputText = () => {
    setInputText("");
  };

  return (
    <div className="search-bar">
      <div className="icon-wrapper search-icon">
        <img src={SearchIcon} alt="Search Icon" />
      </div>
      <input
        type="text"
        name="search-input"
        value={inputText}
        maxLength={maxLength}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => {
          setInputText(e.currentTarget.value);
          onChange(e.currentTarget.value);
        }}
        aria-labelledby="input-search-label"
        className="input-text"
      />
      <div className="icon-wrapper close-button">
        {inputText.length > 0 && (
          <img
            src={CloseIcon}
            alt="Search Icon"
            onClick={() => {
              clearInputText();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
