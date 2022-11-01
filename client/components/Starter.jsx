export const Starter = ({ state }) => {
  return (
    <div className="fixed bottom-0 top-0 right-0 w-[75%] font-regular ">
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex h-fit  flex-col items-center justify-center gap-10 rounded-2xl bg-primary-dark p-8 drop-shadow-xl lg:max-w-[50vw]">
          <h2 className="font-heading text-2xl text-white">
            Choose conversation to start
          </h2>
        </div>
      </div>
    </div>
  );
};
