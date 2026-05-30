import MainLayout from "../layouts/MainLayout";
import DiscussionCard from "../components/DiscussionCard";

import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import API from "../services/api";

function Dashboard() {

  const navigate =
    useNavigate();

  const [discussions,
    setDiscussions] =
    useState([]);
const [search,
  setSearch] =
  useState("");
  const [loading,
    setLoading] =
    useState(true);

  // Protect Route
useEffect(() => {

  const user =
    localStorage.getItem(
      "userInfo"
    );

  if (!user) {

    navigate(
      "/login",
      {
        replace: true,
      }
    );
  }

}, [navigate]);
  // Fetch Discussions
  useEffect(() => {

    const fetchDiscussions =
      async () => {

        try {

          const { data } =
            await API.get(
              "/discussions"
            );

          setDiscussions(
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

    fetchDiscussions();

  }, []);

  const filteredDiscussions =
  discussions.filter(
    (
      discussion
    ) =>
      discussion.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||

      discussion.description
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
  );
  return (
    <MainLayout>

      <div className="grid lg:grid-cols-4 gap-8">

        {/* Left Content */}
        <div className="lg:col-span-3">

          {/* Hero */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-[2rem] p-10 shadow-xl">

            <h1 className="text-5xl font-bold leading-tight">

              Join Community Discussions
              <br />
              in Real-Time 🚀

            </h1>

            <p className="text-gray-200 mt-4 text-lg">

              Create discussions,
              share ideas,
              and chat with
              communities instantly.

            </p>

<div className="mt-8 relative">

  <input
    type="text"
    placeholder="🔍 Search discussions..."
    value={
      search
    }
    onChange={(e) =>
      setSearch(
        e.target.value
      )
    }
    className="w-full bg-[#0B1120] border-2 border-cyan-500 text-white placeholder:text-slate-400 rounded-2xl px-6 py-5 outline-none focus:border-cyan-400 transition text-lg"
  />

</div>

          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">

            <div className="bg-[#1E293B] p-6 rounded-3xl">

              <h3 className="text-gray-400">
                Discussions
              </h3>

              <p className="text-4xl font-bold mt-3">

                {
                  discussions.length
                }

              </p>

            </div>

            <div className="bg-[#1E293B] p-6 rounded-3xl">

              <h3 className="text-gray-400">
                Community Members
              </h3>

              <p className="text-4xl font-bold mt-3">
                Active
              </p>

            </div>

            <div className="bg-[#1E293B] p-6 rounded-3xl">

              <h3 className="text-gray-400">
                Live Chats
              </h3>

              <p className="text-4xl font-bold mt-3">
                Live 🚀
              </p>

            </div>

          </div>

          {/* Discussions */}
          <div className="mt-10">

            <h2 className="text-3xl font-bold mb-6">
              Trending Discussions
            </h2>

            {loading ? (

              <p className="text-gray-400">
                Loading discussions...
              </p>

            ) : discussions.length === 0 ? (

              <p className="text-gray-400">
                No discussions found.
              </p>

            ) : (

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

                {filteredDiscussions.map(
                  (
                    discussion
                  ) => (

                    <DiscussionCard
                      key={
                        discussion._id
                      }
                      title={
                        discussion.title
                      }
                      description={
                        discussion.description
                      }
                      tag={
                        discussion
                          .tags?.[0] ||
                        "General"
                      }
                      author={
                        discussion
                          .createdBy
                          ?.name ||
                        "Unknown"
                      }
                      comments={0}
                      votes={
                        discussion.votes
                      }
                      id={
                        discussion._id
                      }
                    />
                  )
                )}

              </div>

            )}

          </div>

        </div>

        {/* Sidebar */}
        <div className="space-y-6">

          <div className="bg-[#1E293B] rounded-3xl p-6">

            <h2 className="text-xl font-bold mb-5">
              Online Members
            </h2>

            <div className="space-y-4">

              <div className="flex items-center gap-3">

                <div className="w-3 h-3 bg-green-500 rounded-full" />

                Community Live

              </div>

            </div>

          </div>

          <div className="bg-[#1E293B] rounded-3xl p-6">

            <h2 className="text-xl font-bold mb-5">
              Trending Tags
            </h2>

            <div className="flex flex-wrap gap-3">

              <span className="bg-blue-600 px-4 py-2 rounded-full">
                #MERN
              </span>

              <span className="bg-purple-600 px-4 py-2 rounded-full">
                #AI
              </span>

              <span className="bg-green-600 px-4 py-2 rounded-full">
                #DSA
              </span>

            </div>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default Dashboard;