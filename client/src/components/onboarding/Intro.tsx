import useWindowDimensions from "@/hooks/useWindowDimensions";

function Intro() {
  const { height } = useWindowDimensions();
  return (
    <div
      className={
        "flex-1" + (height > 850 ? " bg-blueGeoBg1920" : " bg-blueGeoBg1280")
      }
    ></div>
  );
}

export default Intro;
