import logo from "../../assets/logo.svg";

export default function LandingNavbar() {
  return (
    <nav className="fixed top-0 left-0 z-50  w-full h-16 bg-primary flex items-center justify-center ">
      <div className="flex  items-center gap-8  w-mainWidth  py-8  text-white">
        <img src={logo} alt="logo" className="h-8  hover:cursor-pointer" />
        <p className="text-2xl font-semibold hidden md:block hover:cursor-pointer">
          Coherence
        </p>
      </div>
    </nav>
  );
}
