export default function DotsLoader({ className = "" }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span
        className="w-3 h-3 rounded-full bg-white animate-bounce"
        style={{ animationDelay: "0s" }}
      />
      <span
        className="w-3 h-3 rounded-full bg-white animate-bounce"
        style={{ animationDelay: "0.12s" }}
      />
      <span
        className="w-3 h-3 rounded-full bg-white animate-bounce"
        style={{ animationDelay: "0.24s" }}
      />
    </div>
  );
}
