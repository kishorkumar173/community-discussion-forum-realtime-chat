import Navbar from "../components/Navbar";

function MainLayout({
  children,
}) {

  return (
    <div className="min-h-screen bg-[#050816] text-white flex">

      {/* Fixed Sidebar */}
      <div className="w-[260px] fixed left-0 top-0 h-screen z-50">

        <Navbar />

      </div>

      {/* Main Content */}
      <main className="flex-1 ml-[260px] p-8 overflow-x-hidden">

        {children}

      </main>

    </div>
  );
}

export default MainLayout;