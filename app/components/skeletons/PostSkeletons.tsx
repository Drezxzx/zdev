import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function PostsSkeleton() {
    return (
        // Tema de Skeleton adaptado al modo oscuro
        <SkeletonTheme baseColor="#1f2a37" highlightColor="#374151">
            <div className="flex  flex-col gap-7 max-w-screen-md w-full items-center justify-center">
                <div className="w-full py-4 rounded-lg bg-[#1B2730] flex gap-6 flex-row mb-5">
                    <Skeleton circle={true} height={56} width={56} />
             
                    <div className='flex flex-col gap-3 w-[80%] justify-center'>
                    <Skeleton height={30} width="100%" borderRadius={6} />
                    <div className='w-full flex justify-around gap-4'>
                    <Skeleton height={30} width={60} borderRadius={6} />
                    <Skeleton height={30} width={60} borderRadius={6} />
                    </div>
                        
                    </div>

                </div>

                <article className="flex flex-col w-full items-center justify-center">
                    {[...Array(3)].map((_, i) => (
                        <div className="flex w-full py-4 rounded-lg bg-[#1B2730] gap-6 flex-row mb-5" key={i}>
                            <Skeleton circle={true} height={56} width={56} />

                            <div className="flex gap-3 flex-col w-[80%] justify-center">
                                <Skeleton height={20} width="50%" borderRadius={6} />
                                <Skeleton height={15} width="30%" borderRadius={6} />
                                <Skeleton height={25} width="90%" borderRadius={6} />
                                <Skeleton height={300} width="100%" borderRadius={6} />
                                <div className="flex w-full justify-around gap-4">
                                    <Skeleton height={40} width={60} borderRadius={6} />
                                    <Skeleton height={40} width={60} borderRadius={6} />
                                </div>
                            </div>
                        </div>
                    ))}
                </article>
            </div>
        </SkeletonTheme>
    );
}
