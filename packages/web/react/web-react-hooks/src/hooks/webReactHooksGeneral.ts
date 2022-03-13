import { Ref, useCallback, useState } from 'react';

export function useChildNodeSize<NodeT extends HTMLElement>(): {
  nodeRef: Ref<NodeT>;
  nodeWidth: string;
  nodeHeight: string;
} {
  const [nodeWidth, setNodeWidth] = useState<string>('0px');
  const [nodeHeight, setNodeHeight] = useState<string>('0px');

  const nodeRef = useCallback((node: NodeT | null) => {
    if (!node) {
      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0]) {
        setNodeWidth(`${entries[0].contentRect.width}px`);
        setNodeHeight(`${entries[0].contentRect.height}px`);
      }
    });
    resizeObserver.observe(node);
  }, []) as Ref<NodeT>;

  return {
    nodeRef,
    nodeWidth,
    nodeHeight,
  };
}
