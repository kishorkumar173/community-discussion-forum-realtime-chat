import {
  Trophy,
  MessageSquare,
  Users,
  Flame,
  Calendar,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

function Profile() {

  const navigate =
    useNavigate();

  const [user,
    setUser] =
    useState(null);

  useEffect(() => {

    const userInfo =
      JSON.parse(
        localStorage.getItem(
          "userInfo"
        ) || "null"
      );

    if (!userInfo) {

      navigate(
        "/login",
        {
          replace: true,
        }
      );

    } else {

      setUser(
        userInfo
      );
    }

  }, [navigate]);

  if (!user) {
    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center text-white text-2xl">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white px-8 py-10">

      <div className="max-w-7xl mx-auto">

        {/* TOP BUTTONS */}
        <div className="flex justify-between items-center mb-8">

          <button
            onClick={() =>
              navigate(
                "/dashboard"
              )
            }
            className="bg-slate-800 hover:bg-slate-700 px-6 py-3 rounded-2xl transition font-semibold"
          >
            ← Back to Dashboard
          </button>

       <button
  onClick={() => {

    const newName =
      prompt(
        "Enter your name",
        user?.name
      );

    const newBio =
      prompt(
        "Enter your bio",
        user?.bio ||
        ""
      );

    if (!newName) return;

    const updatedUser = {
      ...user,
      name:
        newName,
      bio:
        newBio,
    };

    setUser(
      updatedUser
    );

    localStorage.setItem(
      "userInfo",
      JSON.stringify(
        updatedUser
      )
    );

    alert(
      "Profile updated 🚀"
    );
  }}
  className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition"
>
  Edit Profile
</button>

        </div>

        {/* PROFILE TOP */}
        <div className="bg-[#111827] border border-slate-800 rounded-[3rem] p-10">

          <div className="flex flex-col lg:flex-row items-center gap-10">

            {/* LEFT */}
            <div className="flex flex-col items-center">

              <div className="w-52 h-52 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center text-7xl font-bold shadow-2xl">

                {
                  user?.name
                    ?.charAt(0)
                    ?.toUpperCase()
                }

              </div>

            </div>

            {/* RIGHT */}
            <div className="flex-1">

              <div className="flex justify-between items-start flex-wrap gap-5">

                <div>

                  <h1 className="text-6xl font-bold">
                    {
                      user?.name
                    }
                  </h1>

                  <p className="text-cyan-400 text-2xl mt-3">
                    Community Member
                  </p>

                  <div className="flex items-center gap-2 text-slate-400 mt-4">

                    <Calendar size={18} />

                    <span>

                      Joined{" "}

                      {
                        user?.createdAt
                          ? new Date(
                              user.createdAt
                            ).toLocaleDateString(
                              "en-US",
                              {
                                month:
                                  "long",
                                year:
                                  "numeric",
                              }
                            )
                          : "Recently"
                      }

                    </span>

                  </div>

                </div>

                <button className="bg-slate-800 border border-slate-700 px-6 py-3 rounded-2xl">

                  Share Profile

                </button>

              </div>

              {/* ABOUT */}
              <div className="mt-8">

                <h2 className="text-3xl font-bold mb-4">
                  About Me
                </h2>

                <p className="text-slate-300 text-lg leading-loose">

                  {
                    user?.bio ||
                    "No bio added yet."
                  }

                </p>

              </div>

              {/* TECH STACK */}
              <div className="mt-8">

                <h2 className="text-3xl font-bold mb-5">
                  Tech Stack
                </h2>

                <div className="flex flex-wrap gap-4">

                  {[
                    "React",
                    "Node.js",
                    "MongoDB",
                    "Express",
                    "Socket.IO",
                    "Tailwind CSS",
                  ].map(
                    (
                      skill
                    ) => (
                      <span
                        key={
                          skill
                        }
                        className="bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 px-5 py-3 rounded-full"
                      >
                        {
                          skill
                        }
                      </span>
                    )
                  )}

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">

          <div className="bg-[#111827] p-8 rounded-[2rem] text-center">

            <MessageSquare className="mx-auto text-cyan-400" />

            <h2 className="text-4xl font-bold mt-3">
              56
            </h2>

            <p className="text-slate-400">
              Discussions
            </p>

          </div>

          <div className="bg-[#111827] p-8 rounded-[2rem] text-center">

            <Users className="mx-auto text-purple-400" />

            <h2 className="text-4xl font-bold mt-3">
              1.2K
            </h2>

            <p className="text-slate-400">
              Followers
            </p>

          </div>

          <div className="bg-[#111827] p-8 rounded-[2rem] text-center">

            <Trophy className="mx-auto text-yellow-400" />

            <h2 className="text-4xl font-bold mt-3">
              4.8K
            </h2>

            <p className="text-slate-400">
              Points
            </p>

          </div>

          <div className="bg-[#111827] p-8 rounded-[2rem] text-center">

            <Flame className="mx-auto text-pink-400" />

            <h2 className="text-4xl font-bold mt-3">
              98%
            </h2>

            <p className="text-slate-400">
              Engagement
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;