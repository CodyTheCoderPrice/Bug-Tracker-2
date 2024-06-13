import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <>
      <Link to="/login" className="px-[30px]">
        Login
      </Link>
      <p className="px-[30px]">Explain details about website...</p>
    </>
  );
}

export default LandingPage;
