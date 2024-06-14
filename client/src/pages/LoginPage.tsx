import Intro from "@/components/onboarding/Intro";
import Login from "@/features/auth/Login";
import Divider from "@/components/onboarding/Divider";
import LinkButton from "@/components/onboarding/LinkButton";

function LoginPage() {
  return (
    <div className="flex h-full">
      <Intro />
      <div className="w-[600px] p-12 shadow-md">
        <Login />
        <Divider text="OR" />
        <LinkButton to="/register" text="SIGN UP" />
      </div>
    </div>
  );
}

export default LoginPage;
