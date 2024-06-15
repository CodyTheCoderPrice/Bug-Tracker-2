import IntroLogo from "@/assets/IntroLogo.svg";

function Intro() {
  return (
    <div className={"flex flex-1 justify-center bg-blueGeoBg1920"}>
      <img
        src={IntroLogo}
        alt="Bug Tracker Logo"
        className="mb-[10%] w-[500px]"
      />
    </div>
  );
}

export default Intro;
