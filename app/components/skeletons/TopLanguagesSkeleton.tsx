import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function TopLanguagesSkeleton() {
    return (
        <SkeletonTheme baseColor="#1f2a37" highlightColor="#374151">
            <section className="flex h-fit w-72 py-4 flex-col gap-4 fixed bg-containers-rounded rounded-lg p-2 items-center justify-start">
                
                <h1 className="text-2xl font-bold">
                    <Skeleton height={28} width={160} />
                </h1>
                
                <div className="flex flex-col gap-3 w-full">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="flex gap-2 flex-row w-full items-center justify-between">
                            
                            <div className="flex gap-1 items-center">
                                <Skeleton height={20} width={20} />
                                <Skeleton height={20} width={100} />
                            </div>

                            <Skeleton height={20} width={60} />
                        </div>
                    ))}
                </div>
            </section>
        </SkeletonTheme>
    );
}
