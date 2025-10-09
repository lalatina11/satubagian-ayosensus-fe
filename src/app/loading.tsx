import SpinnerCustom from "@/components/Loading/Spinner";

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <SpinnerCustom className="size-40" />
    </div>
  );
};

export default Loading;
