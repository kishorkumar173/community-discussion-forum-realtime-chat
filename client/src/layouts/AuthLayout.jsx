import {
  MessageSquare,
  Users,
  Bell,
} from "lucide-react";

function AuthLayout({
  title,
  subtitle,
  children,
}) {
  return (
    <div className="min-h-screen bg-[#050816] relative overflow-hidden text-white">

      {/* Background Glow */}
      <div className="absolute top-[-200px] left-[-150px] w-[500px] h-[500px] bg-cyan-500 opacity-20 blur-[150px] rounded-full" />

      <div className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] bg-purple-700 opacity-20 blur-[150px] rounded-full" />

      {/* Main Layout */}
      <div className="relative z-10 min-h-screen grid lg:grid-cols-[1.1fr_1fr]">

        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-center px-20">

          <div className="max-w-2xl">

            {/* Logo */}
            <div className="flex items-center gap-4 mb-10">

              <div className="bg-gradient-to-r from-cyan-500 to-purple-600 p-4 rounded-2xl shadow-lg">
                <MessageSquare size={28} />
              </div>

              <h1 className="text-5xl font-bold">
                Community Forum
              </h1>

            </div>

            {/* Badge */}
            <div className="inline-flex px-5 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-300 text-sm mb-10">
              🚀 Real-Time Community Platform
            </div>

            {/* Heading */}
            <h1 className="text-7xl font-bold leading-[1.05]">

              Connect.
              <br />

              Discuss.
              <br />

              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Collaborate.
              </span>

            </h1>

            {/* Description */}
            <p className="text-slate-400 text-2xl mt-8 leading-relaxed max-w-2xl">
              Join thousands of developers,
              students and communities discussing
              ideas and collaborating in real time.
            </p>

            {/* Features */}
            <div className="mt-14 space-y-7">

              <div className="flex items-start gap-5">

                <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-4 rounded-2xl shadow-lg">
                  <MessageSquare size={22} />
                </div>

                <div>
                  <h3 className="text-2xl font-semibold">
                    Real-Time Chat
                  </h3>

                  <p className="text-slate-400 text-lg">
                    Instant messaging with online members
                  </p>
                </div>

              </div>

              <div className="flex items-start gap-5">

                <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-4 rounded-2xl shadow-lg">
                  <Users size={22} />
                </div>

                <div>
                  <h3 className="text-2xl font-semibold">
                    Active Communities
                  </h3>

                  <p className="text-slate-400 text-lg">
                    Create and join topic-based groups
                  </p>
                </div>

              </div>

              <div className="flex items-start gap-5">

                <div className="bg-gradient-to-br from-pink-600 to-purple-600 p-4 rounded-2xl shadow-lg">
                  <Bell size={22} />
                </div>

                <div>
                  <h3 className="text-2xl font-semibold">
                    Smart Notifications
                  </h3>

                  <p className="text-slate-400 text-lg">
                    Never miss important updates
                  </p>
                </div>

              </div>

            </div>

            {/* Stats */}
            <div className="mt-14 grid grid-cols-3 rounded-[2rem] overflow-hidden bg-white/5 backdrop-blur-2xl border border-white/10 shadow-xl">

              <div className="text-center py-8 border-r border-white/10">
                <h2 className="text-4xl font-bold text-cyan-400">
                  15K+
                </h2>

                <p className="text-slate-400 mt-2">
                  Members
                </p>
              </div>

              <div className="text-center py-8 border-r border-white/10">
                <h2 className="text-4xl font-bold text-purple-400">
                  2.5K+
                </h2>

                <p className="text-slate-400 mt-2">
                  Discussions
                </p>
              </div>

              <div className="text-center py-8">
                <h2 className="text-4xl font-bold text-pink-400">
                  24/7
                </h2>

                <p className="text-slate-400 mt-2">
                  Active
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center px-8 py-16">

          <div className="relative w-full max-w-3xl">

            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-[3rem] blur-3xl opacity-20" />

            {/* Card */}
            <div className="relative bg-[#0B1120]/95 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-16 shadow-[0_0_50px_rgba(59,130,246,0.15)]">

              <h2 className="text-6xl font-bold">
                {title}
              </h2>

              <p className="text-slate-400 text-2xl mt-5 mb-12">
                {subtitle}
              </p>

              {children}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AuthLayout;