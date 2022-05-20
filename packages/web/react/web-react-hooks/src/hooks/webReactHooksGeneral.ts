import { Ref, useCallback, useState } from 'react';

export function useChildNodeSize<NodeT extends HTMLElement>(): {
  nodeRef?: Ref<NodeT>;
  nodeWidth: number;
  nodeHeight: number;
} {
  const [nodeWidth, setNodeWidth] = useState<number>(0);
  const [nodeHeight, setNodeHeight] = useState<number>(0);

  const nodeRef = useCallback((node?: NodeT) => {
    if (!node) {
      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0]) {
        setNodeWidth(entries[0].contentRect.width);
        setNodeHeight(entries[0].contentRect.height);
      }
    });
    resizeObserver.observe(node);
  }, []) as Ref<NodeT> | undefined;

  return {
    nodeRef,
    nodeWidth,
    nodeHeight,
  };
}
