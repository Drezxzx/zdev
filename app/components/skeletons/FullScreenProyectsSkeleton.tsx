import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function ProyectosSkeleton() {
    return (
        <SkeletonTheme baseColor="#1f2a37" highlightColor="#374151">
            <section className="w-72 overflow-y-auto relative hidden lg:flex space-y-2 rounded-lg flex-col py-2 items-center bg-containers-rounded px-4 z-10 pb-28">
                
                <h1 className="text-2xl flex justify-center items-center gap-2 font-bold">
                    <Skeleton height={24} width={100} />
                    <Skeleton circle={true} height={24} width={24} />
                </h1>
                
                <div className="flex gap-4">
                    <Skeleton height={30} width={90} borderRadius={15} />
                    <Skeleton height={30} width={90} borderRadius={15} />
                </div>

                <div className="flex flex-col space-y-3 justify-center items-center w-full">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="flex flex-col border border-slate-700/55 w-[256px] rounded-lg max-w-[256px] p-2 gap-3 items-start">
                            
                            <Skeleton height={20} width={150} />

                            <Skeleton count={3} height={15} width={200} />

                            <div className="flex gap-2 w-[256px] justify-start items-center">
                                <Skeleton height={25} width={70} borderRadius={12} />
                                <Skeleton height={25} width={70} borderRadius={12} />
                            </div>

                            <Skeleton height={120} width={240} borderRadius={8} />
                        </div>
                    ))}
                </div>

                <span className="text-center text-sm text-slate-400/90 mt-10 font-semibold">
                    <Skeleton width={120} height={20} />
                </span>
            </section>
        </SkeletonTheme>
    );
}
