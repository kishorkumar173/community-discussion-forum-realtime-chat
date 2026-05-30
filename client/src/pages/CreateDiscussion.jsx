import MainLayout from "../layouts/MainLayout";
import {
  Sparkles,
  Tags,
  FileText,
} from "lucide-react";
import {
  useState,
} from "react";
import {
  useNavigate,
} from "react-router-dom";
import API from "../services/api";

function CreateDiscussion() {
  const navigate =
    useNavigate();

  const [formData,
    setFormData] =
    useState({
      title: "",
      category: "",
      tags: "",
      description: "",
    });

  const handleChange =
    (e) => {
      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value,
      });
    };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {

        const userInfo =
          JSON.parse(
            localStorage.getItem(
              "userInfo"
            )
          );

        await API.post(
          "/discussions",
          {
            title:
              formData.title,

            description:
              formData.description,

            tags:
              formData.tags
                .split(",")
                .map((tag) =>
                  tag.trim()
                ),
          },
          {
            headers: {
              Authorization:
                `Bearer ${userInfo.token}`,
            },
          }
        );

        alert(
          "Discussion created 🚀"
        );

        navigate(
          "/dashboard"
        );

      } catch (error) {

        alert(
          error.response?.data
            ?.message ||
            "Failed to create discussion"
        );
      }
    };

  return (
    <MainLayout>

      <div className="relative min-h-screen overflow-hidden">

        {/* Glow Effects */}
        <div className="absolute top-[-150px] left-[-150px] w-[350px] h-[350px] bg-cyan-500 opacity-20 blur-[120px] rounded-full" />

        <div className="absolute bottom-[-150px] right-[-150px] w-[350px] h-[350px] bg-purple-600 opacity-20 blur-[120px] rounded-full" />

        <div className="relative z-10 max-w-6xl mx-auto">

          {/* Header */}
          <div className="mb-12">

            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-300 text-sm mb-6">

              <Sparkles size={18} />

              Start a Community Discussion

            </div>

            <h1 className="text-6xl font-bold text-white leading-tight">
              Create
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                {" "}Discussion
              </span>
            </h1>

            <p className="text-slate-400 text-xl mt-5 max-w-2xl">
              Share your ideas,
              ask questions,
              and collaborate
              with the community.
            </p>

          </div>

          {/* Premium Card */}
          <div className="relative">

            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-[3rem] blur-3xl opacity-10" />

            <div className="relative bg-[#0B1120]/90 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-12 shadow-[0_0_50px_rgba(59,130,246,0.15)]">

              <form
                onSubmit={
                  handleSubmit
                }
                className="space-y-8"
              >

                {/* Title */}
                <div>

                  <label className="flex items-center gap-3 text-xl mb-4 text-slate-300">

                    <FileText size={20} />

                    Discussion Title

                  </label>

                  <input
                    type="text"
                    name="title"
                    value={
                      formData.title
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter discussion title..."
                    required
                    className="w-full p-6 rounded-[1.5rem] bg-[#0F172A] border border-slate-700 text-white placeholder:text-slate-500 outline-none focus:border-cyan-500 transition text-lg"
                  />

                </div>

                {/* Category */}
                <div>

                  <label className="text-xl mb-4 block text-slate-300">
                    Category
                  </label>

                  <select
                    name="category"
                    value={
                      formData.category
                    }
                    onChange={
                      handleChange
                    }
                    className="w-full p-6 rounded-[1.5rem] bg-[#0F172A] border border-slate-700 text-white outline-none focus:border-cyan-500 transition text-lg"
                  >
                    <option>
                      Select Category
                    </option>

                    <option>
                      MERN Stack
                    </option>

                    <option>
                      DSA
                    </option>

                    <option>
                      AI / ML
                    </option>

                    <option>
                      Placements
                    </option>

                    <option>
                      Career Guidance
                    </option>

                  </select>

                </div>

                {/* Tags */}
                <div>

                  <label className="flex items-center gap-3 text-xl mb-4 text-slate-300">

                    <Tags size={20} />

                    Tags

                  </label>

                  <input
                    type="text"
                    name="tags"
                    value={
                      formData.tags
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Example: React, MongoDB, Career"
                    className="w-full p-6 rounded-[1.5rem] bg-[#0F172A] border border-slate-700 text-white placeholder:text-slate-500 outline-none focus:border-cyan-500 transition text-lg"
                  />

                </div>

                {/* Description */}
                <div>

                  <label className="text-xl mb-4 block text-slate-300">
                    Description
                  </label>

                  <textarea
                    rows="8"
                    name="description"
                    value={
                      formData.description
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Write your discussion here..."
                    required
                    className="w-full p-6 rounded-[1.5rem] bg-[#0F172A] border border-slate-700 text-white placeholder:text-slate-500 outline-none focus:border-cyan-500 transition resize-none text-lg"
                  />

                </div>

                {/* Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 py-6 rounded-[1.5rem] font-semibold text-2xl hover:scale-[1.02] transition duration-300 shadow-lg shadow-cyan-500/20"
                >
                  🚀 Create Discussion
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default CreateDiscussion;