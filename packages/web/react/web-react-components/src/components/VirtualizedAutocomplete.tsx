import * as React from 'react';
import Autocomplete, {
  autocompleteClasses,
  AutocompleteProps,
} from '@mui/material/Autocomplete';
import useMediaQuery from '@mui/material/useMediaQuery';
import ListSubheader from '@mui/material/ListSubheader';
import Popper from '@mui/material/Popper';
import { useTheme, styled } from '@mui/material/styles';
import { VariableSizeList, ListChildComponentProps } from 'react-window';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect } from 'react';

function renderRow(props: ListChildComponentProps) {
  const { data, index, style } = props;
  const dataSet = data[index];
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const theme = useTheme();
  const inlineStyle = {
    ...style,
    top: (style.top as number) + parseInt(theme.spacing(1), 10),
  };

  // eslint-disable-next-line no-prototype-builtins
  if (dataSet.hasOwnProperty('group')) {
    return (
      <ListSubheader key={dataSet.key} component="div" style={inlineStyle}>
        {dataSet.group}
      </ListSubheader>
    );
  }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Typography component="li" {...dataSet[0]} noWrap style={inlineStyle}>
      {dataSet[1]}
    </Typography>
  );
}

const OuterElementContext = React.createContext({});

type OuterElementProps = {
  onScroll?: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void;
};

const OuterElement = React.forwardRef<HTMLDivElement, OuterElementProps>(
  (props, ref) => {
    const outerProps = React.useContext(
      OuterElementContext,
    ) as OuterElementProps;

    const onScrollCallback = useCallback(
      (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        outerProps.onScroll?.(e);
        props.onScroll?.(e);
      },
      [outerProps, props],
    );

    return (
      <div
        ref={ref}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...outerProps}
        onScroll={onScrollCallback}
      />
    );
  },
);

function useResetCache(data: unknown) {
  const ref = React.useRef<VariableSizeList>(null);

  useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);

  return ref;
}

// Adapter for react-window
const ListboxComponent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLUListElement> & { overscanCount?: number }
>(function ListboxComponent(props, ref) {
  const { children, overscanCount = 5, ...other } = props;
  const itemData: React.ReactChild[] = [];
  (children as React.ReactChild[]).forEach(
    (item: React.ReactChild & { children?: React.ReactChild[] }) => {
      itemData.push(item);
      itemData.push(...(item.children || []));
    },
  );

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'), {
    noSsr: true,
  });
  const itemCount = itemData.length;
  const itemSize = smUp
    ? parseInt(theme.spacing(4.5), 10)
    : parseInt(theme.spacing(6), 10);

  const getChildSize = (child: React.ReactChild) => {
    // eslint-disable-next-line no-prototype-builtins
    if (child.hasOwnProperty('group')) {
      return parseInt(theme.spacing(6), 10);
    }

    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }

    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  const gridRef = useResetCache(itemCount);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * parseInt(theme.spacing(1), 10)}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElement}
          innerElementType="ul"
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={overscanCount}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
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
  'disableListWrap' | 'ListboxComponent' | 'PopperComponent'
>;

function VirtualizedAutocomplete<
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
  > & {
    ListboxProps?: React.HTMLAttributes<HTMLUListElement> & {
      overscanCount?: number;
    };
  },
) {
  return (
    <Autocomplete
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      disableListWrap
      ListboxComponent={ListboxComponent}
      PopperComponent={StyledPopper}
    />
  );
}

export default VirtualizedAutocomplete;
