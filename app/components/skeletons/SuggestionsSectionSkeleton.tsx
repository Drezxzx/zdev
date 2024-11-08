import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function SuggestionsSkeleton() {
    return (
        <SkeletonTheme baseColor="#1f2a37" highlightColor="#374151">
            <section className="flex mt-56 h-fit w-72 py-4 flex-col gap-4 fixed bg-containers-rounded rounded-lg p-2 items-center justify-start">
                
                <h1 className="text-2xl font-bold">
                    <Skeleton height={28} width={120} />
                </h1>
                
                <div className="flex flex-col gap-4 w-full">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="flex w-full items-center justify-around">
                            
                            <Skeleton circle={true} height={56} width={56} />

                            <div className="flex items-center flex-col gap-2 w-1/2"> 
                                <Skeleton height={20} width={80} />
                            </div>

                            <Skeleton height={30} width={80} borderRadius={15} />
                        </div>
                    ))}
                </div>
            </section>
        </SkeletonTheme>
    );
}
