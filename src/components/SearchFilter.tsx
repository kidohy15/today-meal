import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

const SearchFilter = ({ setSearchKeyword }: any) => {
  return (
    <div className="px-4 md:max-w-4xl mx-auto py-8">
      <div className="flex items-center justify-center w-full">
        <AiOutlineSearch className="w-6 h-6 mx-1" />
        <input
          type="text"
          onChange={(e) => setSearchKeyword(e.target.value)}
          placeholder="레시피를 검색해주세요"
          className="block w-full p-3 text-sm text-gray-800 border border-gray-300 rounded-lg bg-gray-50 outline-none focus:border-blue-500"
        />
      </div>
    </div>
  );
};

export default SearchFilter;
