import { createContext, useState } from "react";

export const SearchResultContext = createContext();

export const SearchResultContextProvider = ({ children }) => {
  const [searchResult, setSearchResult] = useState("");
  return (
    <SearchResultContext.Provider value={[searchResult, setSearchResult]}>
      {children}
    </SearchResultContext.Provider>
  );
};
