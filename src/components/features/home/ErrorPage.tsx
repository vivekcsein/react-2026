import Button from "../../ui/buttons/Button";

interface ErrorPageProps {
  error: unknown;
}

const ErrorPage = ({ error }: ErrorPageProps) => {
  return (
    <div className="center card container-sm p-2">
      <div className="flex flex-col items-center">
        <h2>Something went wrong 😢</h2>

        {/* Safe error display */}
        {error instanceof Error && <p>{error.message}</p>}
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    </div>
  );
};

export default ErrorPage;
