import { useAppDispatch } from "@/app/hooks";
import { useState } from "react";
import { toggleSearchBar } from "@/features/system/systemSlice";

function SearchBar() {
  const dispatch = useAppDispatch();

  const categories = ["All categories", "Projects", "Bugs", "Comments"];
  const [category, setCategory] = useState(categories[0]);

  return (
    <>
      <div
        onClick={() => {
          dispatch(toggleSearchBar());
        }}
        className="absolute left-0 top-0 h-full w-full bg-black/40"
      />
      <div className="absolute border">
        <button>{category}</button>
      </div>
    </>
  );
}

export default SearchBar;
