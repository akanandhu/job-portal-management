import { useEffect, useRef } from "react";

type UseInfiniteScrollOptionsI = {
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
  rootMargin?: string;
  threshold?: number;
};

export function useInfiniteScroll({
  hasMore,
  isLoading,
  onLoadMore,
  rootMargin = "200px",
  threshold = 0.1,
}: UseInfiniteScrollOptionsI) {
  const triggerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const target = triggerRef.current;
    if (!target || !hasMore || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          onLoadMore();
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, isLoading, onLoadMore, rootMargin, threshold]);

  return { triggerRef };
}
