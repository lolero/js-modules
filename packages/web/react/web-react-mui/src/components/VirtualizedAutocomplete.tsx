import type {
  AutocompleteProps,
  AutocompleteRenderGroupParams,
} from '@mui/material/Autocomplete';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import ListSubheader from '@mui/material/ListSubheader';
import Popper from '@mui/material/Popper';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useVirtualizer } from '@tanstack/react-virtual';
import {
  type CSSProperties,
  type HTMLAttributes,
  type Key,
  type ReactElement,
  type ReactNode,
  type Ref,
  useImperativeHandle,
  useRef,
} from 'react';

type GroupDataItem = { group: string; key: string };
type OptionDataItem = [HTMLAttributes<HTMLElement>, ReactNode];
type RowDataItem = GroupDataItem | OptionDataItem;

/**
 * Renders a single virtualized listbox row — a group subheader or an option.
 * @param dataSet - Row data: a group header, or an `[liProps, node]` option tuple.
 * @param key - React key for the row.
 * @param style - Absolute-position style applied by the virtualizer.
 * @returns The row element.
 */
function renderRow(
  dataSet: RowDataItem,
  key: Key,
  style: CSSProperties,
): ReactElement {
  if (Array.isArray(dataSet)) {
    const { key: _key, ...liProps } =
      dataSet[0] as HTMLAttributes<HTMLElement> & {
        key?: Key;
      };
    return (
      <Typography key={key} component="li" {...liProps} noWrap style={style}>
        {dataSet[1]}
      </Typography>
    );
  }
  return (
    <ListSubheader key={key} component="div" style={style}>
      {dataSet.group}
    </ListSubheader>
  );
}

type ListboxComponentProps = HTMLAttributes<HTMLElement> & {
  ref?: Ref<HTMLElement>;
  overscanCount?: number;
  ownerState?: unknown;
};

/**
 * Adapter for `@tanstack/react-virtual` — MUI's `slots.listbox`, virtualized.
 * @param props - Component props.
 * @param props.ref - Ref MUI uses to reach the scrollable listbox element.
 * @param props.children - Group and option elements supplied by MUI.
 * @param props.overscanCount - Rows rendered beyond the visible window.
 * @param props.ownerState - MUI-injected slot state, unused here.
 * @returns The virtualized listbox element.
 */
function ListboxComponent({
  ref,
  children,
  overscanCount = 5,
  ownerState: _ownerState,
  ...other
}: ListboxComponentProps): React.ReactNode {
  const itemData: RowDataItem[] = [];
  (children as ReactElement[]).forEach(
    (item: ReactElement & { children?: ReactElement[] }) => {
      itemData.push(item as unknown as RowDataItem);
      itemData.push(...((item.children ?? []) as unknown as RowDataItem[]));
    },
  );

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'), { noSsr: true });
  const itemSize = smUp
    ? parseInt(theme.spacing(4.5), 10)
    : parseInt(theme.spacing(6), 10);

  const getChildSize = (child: RowDataItem): number =>
    !Array.isArray(child) ? parseInt(theme.spacing(6), 10) : itemSize;

  const scrollElementRef = useRef<HTMLUListElement>(null);
  useImperativeHandle(ref, () => scrollElementRef.current as HTMLElement, []);

  const edgePaddingPx = parseInt(theme.spacing(1), 10);

  // WATCH: react-compiler-incompatible-library
  // @tanstack/react-virtual is on the React Compiler's incompatible list, so the
  // compiler skips this component. Deliberate: memoizing would break the
  // virtualizer's measurement assumptions. Only ListboxComponent is skipped —
  // VirtualizedAutocomplete below still compiles.
  // eslint-disable-next-line react-hooks/incompatible-library
  const virtualizer = useVirtualizer({
    count: itemData.length,
    getScrollElement: () => scrollElementRef.current,
    estimateSize: (index) => getChildSize(itemData[index]),
    overscan: overscanCount,
    paddingStart: edgePaddingPx,
    paddingEnd: edgePaddingPx,
  });

  const containerHeight = Math.min(
    virtualizer.getTotalSize(),
    8 * itemSize + 2 * edgePaddingPx,
  );

  return (
    <ul
      ref={scrollElementRef}
      {...other}
      style={{
        ...other.style,
        height: containerHeight,
        overflow: 'auto',
        position: 'relative',
        padding: 0,
        margin: 0,
        listStyle: 'none',
      }}
    >
      <div style={{ height: virtualizer.getTotalSize(), position: 'relative' }}>
        {virtualizer.getVirtualItems().map((virtualItem) =>
          renderRow(itemData[virtualItem.index], virtualItem.key, {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: virtualItem.size,
            transform: `translateY(${virtualItem.start}px)`,
          }),
        )}
      </div>
    </ul>
  );
}

/**
 * Passes a group's `{ key, group, children }` straight through instead of
 * letting MUI's default wrap it in an `<li>`, so `ListboxComponent` can flatten
 * groups and their options into one flat list of virtualized rows. Not a valid
 * `ReactNode`, hence the cast — MUI's own virtualization demo does the same.
 * @param params - The group's key, label and rendered options.
 * @returns The untouched group params.
 */
function renderGroup(params: AutocompleteRenderGroupParams): ReactNode {
  return params as unknown as ReactNode;
}

const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: 'border-box',
    '& ul': {
      padding: 0,
      margin: 0,
    },
  },
});

export type VirtualizedAutocompleteProps<
  OptionT,
  MultipleT extends boolean | undefined = undefined,
  DisableClearableT extends boolean | undefined = undefined,
  FreeSoloT extends boolean | undefined = undefined,
> = Omit<
  AutocompleteProps<OptionT, MultipleT, DisableClearableT, FreeSoloT>,
  'disableListWrap' | 'renderGroup' | 'slots'
> & {
  getOptionLabel: AutocompleteProps<
    OptionT,
    MultipleT,
    DisableClearableT,
    FreeSoloT
  >['getOptionLabel'];
  renderOption: AutocompleteProps<
    OptionT,
    MultipleT,
    DisableClearableT,
    FreeSoloT
  >['renderOption'];
};

/**
 * MUI `Autocomplete` with a `@tanstack/react-virtual` listbox, for rendering
 * long option lists performantly.
 * @param props - Autocomplete props, plus required `getOptionLabel` and `renderOption`.
 * @returns Virtualized autocomplete.
 */
export function VirtualizedAutocomplete<
  OptionT,
  MultipleT extends boolean | undefined = undefined,
  DisableClearableT extends boolean | undefined = undefined,
  FreeSoloT extends boolean | undefined = undefined,
>(
  props: VirtualizedAutocompleteProps<
    OptionT,
    MultipleT,
    DisableClearableT,
    FreeSoloT
  >,
): React.ReactNode {
  return (
    <Autocomplete
      {...props}
      disableListWrap
      // Pass each group's `{ key, group, children }` through untouched instead
      // of letting MUI wrap it in an <li>, so the listbox can flatten groups and
      // their options into one virtualized row list.
      renderGroup={renderGroup}
      slots={{
        listbox: ListboxComponent as React.JSXElementConstructor<
          React.HTMLAttributes<HTMLElement>
        >,
        popper: StyledPopper,
      }}
    />
  );
}
