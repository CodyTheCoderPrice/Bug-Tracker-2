import IntroLogo from "@/assets/IntroLogo.svg";

function Intro() {
  return (
    <div className={"bg-blueGeoBg flex flex-1 justify-center"}>
      <img
        src={IntroLogo}
        alt="Bug Tracker Logo"
        className="invisible mb-[10%] w-[450px] laptop:visible"
      />
      <div className="pointer-events-none absolute left-[-600px] h-full w-full bg-black/5" />
    </div>
  );
}

export default Intro;
