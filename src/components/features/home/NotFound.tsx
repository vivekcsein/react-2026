import Link from "../../ui/Link";

const NotFound = () => {
  return (
    <div className="container-md">
      <Link href={"/"} className="card">
        <h1 className="notfound-code">404</h1>
        <h2>Page not found</h2>
        <p>Sorry, the page you are looking for doesn't exist or has been moved.</p>
        <span className="card-action">← Go back home</span>
      </Link>
    </div>
  );
};

export default NotFound;
