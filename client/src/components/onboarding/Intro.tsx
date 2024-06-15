import IntroLogo from "@/assets/IntroLogo.svg";

function Intro() {
  return (
    <div className={"flex flex-1 justify-center bg-blueGeoBg1920"}>
      <img
        src={IntroLogo}
        alt="Bug Tracker Logo"
        className="laptop:visible invisible mb-[10%] w-[450px]"
      />
      <div className="pointer-events-none absolute left-[-600px] h-full w-full bg-black/5" />
    </div>
  );
}

export default Intro;
