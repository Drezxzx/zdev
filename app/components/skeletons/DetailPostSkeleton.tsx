import { IconArrowLeft } from '@tabler/icons-react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const DetailPostSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#1f2a37" highlightColor="#374151">
      <main className="w-screen h-auto p-2 lg:p-0 flex flex-col items-center justify-center">
        <div className="w-fit left-2 z-[1000] hover:scale-105 transition-all flex fixed top-[5.8rem] lg:top-[1.6rem] lg:left-8 items-start">
          <button>
            <IconArrowLeft size={30} />
          </button>
        </div>

        <div className="flex mt-24 flex-col gap-7 max-w-[657px] w-full items-center justify-center">
          <article className="flex flex-col w-full items-center justify-center">
            <div className="flex w-full py-4 p-1 rounded-lg bg-[#1B2730] gap-2 lg:gap-6 flex-row mb-5">
              <Skeleton circle width={50} height={50} />
              <div className="flex gap-2 lg:gap-3 flex-col w-[80%] justify-center">
                <div className="gap-3 flex justify-between items-center">
                  <div className="flex gap-1 justify-start items-center">
                    <Skeleton width={100} height={20} />
                  </div>
                  <Skeleton width={50} height={20} />
                </div>
                <Skeleton width="80%" height={15} />
                <Skeleton width="100%" height={20} />
                <Skeleton width="100%" height={200} />
                <div className="flex w-full justify-around gap-4"></div>
                <SectionComentsSkeleton />
              </div>
            </div>
          </article>
        </div>
      </main>
    </SkeletonTheme>
  );
};

const SectionComentsSkeleton = () => (
  <div className="flex flex-col gap-4 mt-4">
    {Array.from({ length: 3 }).map((_, index) => (
      <Skeleton key={index} width="100%" height={60} />
    ))}
  </div>
);

export default DetailPostSkeleton;
