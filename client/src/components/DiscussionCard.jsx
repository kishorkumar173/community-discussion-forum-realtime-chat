import {
  MessageCircle,
  ArrowUp,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

function DiscussionCard({
  id,
  title,
  description,
  tag,
  author,
  comments,
  votes,
}) {
  const navigate =
    useNavigate();

  const handleClick =
    () => {
      navigate(
        `/discussion/${id}`
      );
    };

  return (
    <div className="bg-[#1E293B] rounded-3xl p-6 shadow-lg hover:scale-[1.02] transition duration-300 border border-slate-700">

      <div className="flex justify-between items-center">

        <span className="bg-blue-600 text-sm px-4 py-1 rounded-full">
          {tag}
        </span>

        <div className="flex items-center gap-2 text-gray-400">

          <ArrowUp size={18} />

          {votes}

        </div>

      </div>

      <h2 className="text-2xl font-bold mt-5">
        {title}
      </h2>

      <p className="text-gray-400 mt-3 line-clamp-3">
        {description}
      </p>

      <div className="flex justify-between items-center mt-6">

        <p className="text-sm text-gray-500">
          Posted by {author}
        </p>

        <div className="flex items-center gap-2 text-gray-400">

          <MessageCircle size={18} />

          {comments}

        </div>

      </div>

      <button
        onClick={handleClick}
        className="mt-5 bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl w-full transition"
      >
        Join Discussion
      </button>

    </div>
  );
}

export default DiscussionCard;