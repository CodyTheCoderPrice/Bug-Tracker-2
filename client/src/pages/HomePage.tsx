function HomePage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="bg-plain-1 mx-10 mt-10 h-[100px]"></div>
      <div className="mx-10 mb-10 mt-6 flex grow">
        <div className="bg-plain-1 mr-5 flex-1"></div>
        <div className="bg-plain-1 ml-5 flex-1"></div>
      </div>
    </div>
  );
}

export default HomePage;
