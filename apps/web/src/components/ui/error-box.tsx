const ErrorBox = ({ message }: { message?: string }) => {
  return <>{message && <span className="text-xs text-destructive">{message}</span>}</>;
};

export default ErrorBox;
