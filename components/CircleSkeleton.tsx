function CircleSkeleton() {
  return (
    <div className="space-y-2.5 animate-pulse">
      <div className="flex items-center w-full space-x-2">
        <div className="h-5 w-5 rounded-full bg-[#373737]"></div>
      </div>
    </div>
  );
}

export default CircleSkeleton;
