import {
  ArrowBigUp,
  Clock3,
  MessageCircle,
  Send,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import API from "../services/api";
import socket from "../socket";

function DiscussionDetails() {
  const { id } =
    useParams();

  const [discussion,
    setDiscussion] =
    useState(null);

  const [loading,
    setLoading] =
    useState(true);

  const [comments,
    setComments] =
    useState([]);

  const [commentText,
    setCommentText] =
    useState("");

  const [liveMessages,
    setLiveMessages] =
    useState([]);

  useEffect(() => {

    const fetchDiscussion =
      async () => {
        try {

          const { data } =
            await API.get(
              `/discussions/${id}`
            );

          setDiscussion(
            data
          );

        } catch (error) {

          console.log(
            error
          );

        } finally {

          setLoading(
            false
          );
        }
      };

    const fetchComments =
      async () => {
        try {

          const { data } =
            await API.get(
              `/comments/${id}`
            );

          setComments(
            data
          );

        } catch (error) {

          console.log(
            error
          );
        }
      };

    // Join discussion room
    socket.emit(
      "joinDiscussion",
      id
    );

    // Receive real-time messages
    socket.on(
      "receiveMessage",
      (message) => {

        setLiveMessages(
          (prev) => [
            message,
            ...prev,
          ]
        );
      }
    );

    fetchDiscussion();
    fetchComments();

    return () => {
      socket.off(
        "receiveMessage"
      );
    };

  }, [id]);

  const handleComment =
    async () => {

      if (
        !commentText.trim()
      ) {
        return alert(
          "Write a comment first"
        );
      }

      try {

        const userInfo =
          JSON.parse(
            localStorage.getItem(
              "userInfo"
            ) || "{}"
          );

        const response =
          await API.post(
            `/comments/${id}`,
            {
              text:
                commentText,
            },
            {
              headers: {
                Authorization:
                  `Bearer ${userInfo.token}`,
              },
            }
          );

        // Emit live message
        socket.emit(
          "sendMessage",
          {
            discussionId:
              id,

            text:
              commentText,

            user:
              userInfo.name,

            createdAt:
              new Date(),
          }
        );

        setComments(
          [
            response.data,
            ...comments,
          ]
        );

        setCommentText("");

      } catch (error) {

        console.log(
          error
        );

        alert(
          "Comment failed"
        );
      }
    };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-2xl bg-[#050816]">
        Loading Discussion...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white px-6 py-10">

      <div className="max-w-6xl mx-auto">

        {/* HERO */}
        <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#111827] via-[#172554] to-[#312E81] p-14 border border-slate-800 shadow-2xl">

          <div className="relative z-10">

            <span className="bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 px-5 py-2 rounded-full text-sm font-medium">

              {
                discussion?.tags?.[0]
              }

            </span>

            <h1 className="text-5xl font-bold mt-8">

              {
                discussion?.title
              }

            </h1>

            <p className="text-slate-300 text-xl mt-6">

              {
                discussion?.description
              }

            </p>

            <div className="flex flex-wrap items-center gap-8 mt-10">

              <div>

                <p className="font-semibold text-xl">

                  Posted by{" "}
                  {
                    discussion
                      ?.createdBy
                      ?.name
                  }

                </p>

                <div className="flex items-center gap-2 text-slate-400 mt-2">

                  <Clock3
                    size={18}
                  />

                  <span>

                    {new Date(
                      discussion?.createdAt
                    ).toLocaleDateString()}

                  </span>

                </div>

              </div>

              <div className="flex items-center gap-3 bg-[#0B1120] border border-slate-700 rounded-2xl px-6 py-4">

                <ArrowBigUp
                  className="text-cyan-400"
                  size={24}
                />

                <span className="font-bold text-xl">

                  {
                    discussion?.votes || 0
                  } Votes

                </span>

              </div>

            </div>

          </div>

        </div>

        {/* COMMENTS */}
        <div className="mt-14">

          <div className="flex items-center gap-4 mb-8">

            <MessageCircle
              size={32}
              className="text-cyan-400"
            />

            <h2 className="text-4xl font-bold">
              Community Comments
            </h2>

          </div>

          <div className="space-y-6">

            {[...liveMessages,
              ...comments].length === 0 ? (

              <div className="bg-[#111827] border border-slate-800 rounded-[2rem] p-8 text-slate-400">

                No comments yet.

              </div>

            ) : (

              [...liveMessages,
                ...comments].map(
                (
                  comment,
                  index
                ) => (

                  <div
                    key={
                      comment._id ||
                      index
                    }
                    className="bg-[#111827] border border-slate-800 rounded-[2rem] p-8"
                  >

                    <h3 className="text-xl font-semibold">

                      {
                        comment
                          .userId
                          ?.name ||
                        comment.user
                      }

                    </h3>

                    <p className="text-slate-500 mt-1">

                      {new Date(
                        comment.createdAt
                      ).toLocaleDateString()}

                    </p>

                    <p className="text-slate-300 text-lg mt-5">

                      {
                        comment.text
                      }

                    </p>

                  </div>
                )
              )

            )}

          </div>

        </div>

        {/* COMMENT BOX */}
        <div className="bg-[#111827] border border-slate-800 rounded-[3rem] p-10 mt-12">

          <h2 className="text-3xl font-bold mb-6">
            Add a Comment
          </h2>

          <textarea
            rows="5"
            value={
              commentText
            }
            onChange={(e) =>
              setCommentText(
                e.target.value
              )
            }
            placeholder="Share your thoughts..."
            className="w-full bg-[#0B1120] border border-slate-700 rounded-[2rem] p-6 text-white outline-none focus:border-cyan-500 resize-none"
          />

          <button
            onClick={
              handleComment
            }
            className="mt-6 bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-4 rounded-2xl text-lg font-semibold flex items-center gap-3"
          >
            <Send size={20} />
            Post Comment
          </button>

        </div>

      </div>

    </div>
  );
}

export default DiscussionDetails;