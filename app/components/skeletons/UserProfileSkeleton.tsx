import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function UserProfileSkeleton() {
    return (
        <SkeletonTheme baseColor="#1f2a37" highlightColor="#374151">
            <section className="flex lg:mb-5 p-2 lg:p-0 mt-24 w-full flex-col md:flex-row lg:flex-row h-auto gap-3 lg:gap-x-5 rounded-lg max-w-[657px]">
                
                <article className="flex gap-3 md:w-[60%] p-5 rounded-lg bg-[#1B2730] items-start">
                    
                    <Skeleton circle height={96} width={96} />

                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col m-1 items-start gap-2">
                            <Skeleton height={28} width={150} />
                            <Skeleton height={20} width={100} />
                        </div>

                        <section className="flex gap-3 flex-col">
                            <div className="flex gap-3 flex-col">
                                <div className="flex gap-6">
                                    <div className="flex flex-col items-start gap-1">
                                        <Skeleton height={20} width={70} />
                                        <Skeleton height={20} width={40} />
                                    </div>
                                    <div className="flex flex-col items-start gap-1">
                                        <Skeleton height={20} width={70} />
                                        <Skeleton height={20} width={40} />
                                    </div>
                                </div>
                                
                               
                                <Skeleton height={36} width={100} borderRadius={8} />
                            </div>
                        </section>
                    </div>
                </article>

                <article className="bg-[#1B2730] p-1 lg:p-0 rounded-lg md:w-[40%]">
                    <h1 className="text-center my-1 font-bold">
                        <Skeleton height={24} width={160} />
                    </h1>
                    
                    <div className="grid grid-cols-2 p-2 gap-2 w-full h-auto">
                        {[...Array(4)].map((_, index) => (
                            <div key={index} className="text-white cursor-default font-semibold rounded-full py-2 px-2 bg-white/5 border border-white/10 flex justify-between items-center gap-x-2 min-h-[46px] transition hover:bg-white/10">
                                
                                <Skeleton height={20} width={70} />

                                <Skeleton circle height={24} width={24} />
                            </div>
                        ))}
                    </div>
                </article>
            </section>
        </SkeletonTheme>
    );
}
