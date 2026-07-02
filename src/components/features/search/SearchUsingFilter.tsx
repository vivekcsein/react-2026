import Button from "../../ui/buttons/Button";
import Input from "../../ui/inputs/Input";
import { useSearch } from "../../../packages/hooks/useSearch";
import { usersLink } from "../../../packages/configs/app.config";
import { useHighlight } from "../../../packages/hooks/useHighlight";

interface User {
  id: number;
  name: string;
  email: string;
}

const SearchUsingFilter = () => {
  const { query, setQuery, items, isLoading, error, hasMore, loadMore } = useSearch<User>({
    key: "users-list", // 🔑 unique identity
    url: usersLink,
    limit: 5,
    filterFn: (user, query) => user.name.toLowerCase().includes(query.toLowerCase()),
  });

  const highlight = useHighlight(query);

  return (
    <div className="container-md">
      <div className="card search-card">
        <h3 className="header-title text-center">Search Users</h3>

        <Input
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
          placeholder="Search users..."
        />

        {isLoading && <p>Loading...</p>}
        {error && <p>Error loading users</p>}

        <ol className="search-list">
          {items.map((user) => (
            <li key={user.id} className="search-item cursor-pointer">
              <span className="user-name">{highlight(user.name)}</span>
              <span className="user-email">{highlight(user.email)}</span>
            </li>
          ))}
        </ol>

        {hasMore && (
          <div className="w-full center">
            <Button onClick={loadMore}>Show More</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchUsingFilter;
