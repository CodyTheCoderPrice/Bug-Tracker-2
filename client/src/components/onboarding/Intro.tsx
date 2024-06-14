import useWindowDimensions from "@/hooks/useWindowDimensions";
import IntroLogo from "@/assets/IntroLogo.svg";

function Intro() {
  const { height } = useWindowDimensions();
  return (
    <div
      className={
        "flex flex-1 justify-center" +
        (height > 850 ? " bg-blueGeoBg1920" : " bg-blueGeoBg1280")
      }
    >
      <img
        src={IntroLogo}
        alt="Bug Tracker Logo"
        className="mb-[150px] w-[500px]"
      />
    </div>
  );
}

export default Intro;
