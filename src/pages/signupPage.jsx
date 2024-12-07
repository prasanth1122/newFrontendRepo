import LandingNavbar from "../components/navbar/landingpageNavbar";
import SignupForm from "../components/signupForm/signupForm";

export default function SignupPage() {
  return (
    <section className="w-full h-full flex flex-col items-center gap-8">
      <LandingNavbar />
      <main className="w-mainWidth mt-24 flex flex-col items-center gap-8  ">
        <h1 className="text-4xl text-important_text w-full text-center font-bold">
          Welcome to Coherence
        </h1>
        <SignupForm />
      </main>
    </section>
  );
}
