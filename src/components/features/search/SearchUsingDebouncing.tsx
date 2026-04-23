import Input from "../../ui/input/Input";
import { useState, useEffect } from "react";
import useHttp from "../../../packages/hooks/useHttp";
import useDebounce from "../../../packages/hooks/useDebounce";
import { usersLink } from "../../../packages/configs/config.app";

interface UserData {
  name: string;
}

const SearchUsingDebouncing = () => {
  const [query, setQuery] = useState("");

  const { debouncedValue } = useDebounce(query, 330);

  // ✅ Use generic here
  const { data, execute, isLoading, error } = useHttp<UserData>();

  useEffect(() => {
    // optional: reset state if needed
    if (!debouncedValue) return;

    const url = `${usersLink}/${debouncedValue}`;
    execute({ url });
  }, [debouncedValue, execute]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();

    // allow only numbers
    if (!/^\d*$/.test(value)) return;

    setQuery(value);
  };
  return (
    <div className="container-md">
      <div className="card">
        {/* HEADER */}
        <div className="header-nav">
          <h4 className="w-full header-title text-center">Search Feature Using Debouncing </h4>
        </div>

        <div className="center gap-xl p-2">
          <Input
            id="search"
            type="number"
            placeholder="Search by ID (e.g. 1)"
            value={query}
            onChange={handleChange}
          />
        </div>

        <div className="w-full flex-col center">
          <h4>Results:</h4>

          {/* Loading */}
          {isLoading && <p>Loading...</p>}

          {/* Error */}
          {error && error.status == 404 && <p>Person Not Found</p>}

          {/* Success */}
          {!isLoading && !error && data?.name && (
            <h2>
              Person name is: <span className="name">{data.name}</span>
            </h2>
          )}

          {/* Empty state */}
          {!isLoading && !error && debouncedValue && !data && <p>No results found.</p>}

          {/* Initial */}
          {!debouncedValue && <p>Start typing to search...</p>}
        </div>
      </div>
    </div>
  );
};

export default SearchUsingDebouncing;
