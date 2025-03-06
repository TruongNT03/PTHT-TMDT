const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="animate-spin w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full"></div>
    </div>
  );
};

export default Loading;
