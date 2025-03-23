import React, { Suspense } from 'react';

// Lazy load useRecommended hook
const LazyRecommended = React.lazy(() =>
  import('@wsh-2025/client/src/features/recommended/hooks/useRecommended').then((module) => ({
    default: module.useRecommended, // `useRecommended`がdefaultエクスポートされていない場合
  })),
);

export const HomePage = () => {
  return (
    <>
      <title>Home - AremaTV</title>

      <div className="w-full py-[48px]">
        {/* Suspenseでラップして遅延読み込み */}
        <Suspense fallback={<div>Loading...</div>}>
          <LazyRecommended referenceId="entrance" />
        </Suspense>
      </div>
    </>
  );
};
