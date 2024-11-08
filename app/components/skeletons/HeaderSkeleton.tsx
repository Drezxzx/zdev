import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function HeaderSkeleton() {
    return (
        <SkeletonTheme baseColor="#1f2a37" highlightColor="#374151">
            <div className="flex lg:bg-[#1B2730] bg-transparent py-1 px-2 w-fit justify-center rounded-xl items-center gap-x-4">
                
                <div className="hidden lg:block">
                    <Skeleton circle={true} height={32} width={32} />
                </div>

                <Skeleton height={20} width={80} borderRadius={4} />

                <div className="border-l-2 flex justify-end pl-2 items-center border-slate-500/80 h-[80%]">
                    <Skeleton height={25} width={25} borderRadius={6} />
                </div>
            </div>
        </SkeletonTheme>
    );
}
