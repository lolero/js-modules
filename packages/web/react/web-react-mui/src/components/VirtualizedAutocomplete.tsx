import type { AutocompleteProps } from '@mui/material/Autocomplete';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import ListSubheader from '@mui/material/ListSubheader';
import Popper from '@mui/material/Popper';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useVirtualizer } from '@tanstack/react-virtual';
import {
  type CSSProperties,
  forwardRef,
  type HTMLAttributes,
  type Key,
  type ReactElement,
  type ReactNode,
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

// Adapter for @tanstack/react-virtual
const ListboxComponent = forwardRef<
  HTMLElement,
  HTMLAttributes<HTMLElement> & { overscanCount?: number; ownerState?: unknown }
>(function ListboxComponent(props, ref) {
  const {
    children,
    overscanCount = 5,
    ownerState: _ownerState,
    ...other
  } = props;

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

  const getChildSize = (child: RowDataItem) =>
    !Array.isArray(child) ? parseInt(theme.spacing(6), 10) : itemSize;

  const scrollElementRef = useRef<HTMLUListElement>(null);
  useImperativeHandle(ref, () => scrollElementRef.current as HTMLElement, []);

  const edgePaddingPx = parseInt(theme.spacing(1), 10);

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
});

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
  'disableListWrap' | 'slots'
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
) {
  return (
    <Autocomplete
      {...props}
      disableListWrap
      slots={{
        listbox: ListboxComponent as React.JSXElementConstructor<
          React.HTMLAttributes<HTMLElement>
        >,
        popper: StyledPopper,
      }}
    />
  );
}
