import IntroLogo from "@/assets/logos/logo_with_black_text_side.svg";

function Intro() {
  return (
    <div
      className={
        "bg-unprotected-geo dark:bg-dark-mode-geo flex flex-1 justify-center"
      }
    >
      <img
        src={IntroLogo}
        alt="Bug Tracker Logo"
        className="mb-[5%] hidden w-[650px] px-10 laptop:block"
      />
      <div className="pointer-events-none absolute left-[-600px] h-full w-full bg-black/5" />
    </div>
  );
}

export default Intro;
