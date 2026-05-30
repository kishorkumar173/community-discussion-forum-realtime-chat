import MainLayout
from "../layouts/MainLayout";

import {
  Bell,
} from "lucide-react";

function Notifications() {
  return (
    <MainLayout>

      <div className="min-h-[80vh] flex items-center justify-center">

        <div className="bg-[#111827] border border-slate-800 rounded-[3rem] p-12 text-center max-w-xl w-full shadow-2xl">

          <div className="flex justify-center">

            <div className="bg-cyan-500/10 p-6 rounded-full">

              <Bell
                size={50}
                className="text-cyan-400"
              />

            </div>

          </div>

          <h1 className="text-4xl font-bold mt-8">

            Notifications

          </h1>

          <p className="text-slate-400 text-lg mt-4">

            Real-time notifications
            will appear here soon 🚀

          </p>

        </div>

      </div>

    </MainLayout>
  );
}

export default Notifications;