import { faCircleNotch } from '@fortawesome/free-solid-svg-icons/faCircleNotch';
import { faCloud } from '@fortawesome/free-solid-svg-icons/faCloud';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import Avatar, { avatarClasses } from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import isNull from 'lodash/isNull';
import orderBy from 'lodash/orderBy';
import values from 'lodash/values';
import type { CSSProperties } from 'react';
import type React from 'react';
import { useCallback, useMemo, useState } from 'react';
import type { NodeChain } from '@js-modules/apps-dapp-common-store-redux';
import { useNodeChainsGetMany } from '@js-modules/apps-dapp-common-store-redux';
import { usePrevious } from '@js-modules/common-react-utils';
import {
  MuiFaIcon,
  VirtualizedAutocomplete,
} from '@js-modules/web-react-utils';

export const WebTokensWorkspaceContentBox: React.FC = () => {
  const { request: nodeChainsGetManyRequest, entities: nodeChains } =
    useNodeChainsGetMany();
  const nodeChainsGetManyRequestPrevious = usePrevious(
    nodeChainsGetManyRequest,
  );

  const sortedNodeChains = useMemo(() => {
    return orderBy(values(nodeChains), 'name', 'asc');
  }, [nodeChains]);

  const [selectedChain, setSelectedChain] = useState<NodeChain | null>(null);

  const changeChainCallback = useCallback(
    (
      _e: React.SyntheticEvent<Element, Event>,
      nodeChain: NodeChain | null | undefined,
    ) => {
      setSelectedChain(nodeChain ?? null);
    },
    [],
  );

  if (
    nodeChainsGetManyRequestPrevious?.isPending &&
    !nodeChainsGetManyRequest?.isPending &&
    isNull(selectedChain)
  ) {
    setSelectedChain(nodeChains['1'] ?? null);
  }

  return (
    <Box>
      <MuiFaIcon
        icon={faCloud}
        beat
        style={{
          ['--fa-animation-duration' as keyof CSSProperties]: '5s',
        }}
      />
      <MuiFaIcon icon={faCloud} beat />
      <VirtualizedAutocomplete
        sx={{
          mt: '1em',
        }}
        options={sortedNodeChains}
        getOptionLabel={(nodeChain) => nodeChain?.name ?? ''}
        groupBy={(nodeChain) => nodeChain?.name[0] ?? ''}
        popupIcon={
          nodeChainsGetManyRequest?.isPending ? (
            <MuiFaIcon icon={faCircleNotch} spin />
          ) : (
            <ArrowDropDown />
          )
        }
        disabled={nodeChainsGetManyRequest?.isPending}
        value={selectedChain}
        onChange={changeChainCallback}
        renderInput={(params) => {
          if (!selectedChain) {
            return <TextField {...params} label="Chain" />;
          }

          return (
            <TextField
              {...params}
              label="Chain"
              slotProps={{
                ...params.slotProps,
                input: {
                  ...params.slotProps.input,
                  startAdornment: (
                    <InputAdornment position="start">
                      <Avatar
                        sx={{
                          width: '1.5em',
                          height: '1.5em',
                          // mx: '.5em',
                          borderRadius: 0,
                          [`& .${avatarClasses.img}`]: {
                            objectFit: 'scale-down',
                          },
                        }}
                        src={selectedChain.iconUrl}
                      />
                    </InputAdornment>
                  ),
                },
              }}
            />
          );
        }}
        renderOption={(props, nodeChain) => {
          if (!nodeChain) {
            return null;
          }
          return [
            props,
            <Box
              key={nodeChain.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Avatar
                sx={{
                  width: '1.5em',
                  height: '1.5em',
                  mx: '.5em',
                  borderRadius: 0,
                  [`& .${avatarClasses.img}`]: {
                    objectFit: 'scale-down',
                  },
                }}
                src={nodeChain.iconUrl}
              />
              <Typography>{nodeChain.name}</Typography>
            </Box>,
          ] as React.ReactNode;
        }}
        renderGroup={(params) => params as unknown as React.ReactNode}
      />
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra
        aliquam dui, a sodales quam. Maecenas volutpat quis orci et mollis.
        Proin vel convallis ipsum. Duis at ante vestibulum, condimentum purus
        vitae, porttitor ex. Pellentesque a purus semper, congue dolor ac,
        elementum mauris. Duis nec dui tempus, sagittis diam ut, commodo felis.
        Nam vel finibus magna. Etiam et quam sit amet augue dignissim dignissim.
        Cras elementum ac enim vitae sagittis. Cras iaculis, mauris et laoreet
        faucibus, felis mi viverra erat, quis volutpat magna augue eget turpis.
        Aenean consectetur nunc sit amet hendrerit rhoncus. In ante libero,
        rutrum vel porta ac, malesuada a purus. Integer quis lacus magna. Proin
        et suscipit lacus. Curabitur mattis efficitur lectus vitae lacinia. Ut
        rhoncus cursus arcu eget blandit. Mauris elit nisi, cursus vel
        ullamcorper nec, mollis in eros. Nullam rutrum accumsan condimentum.
        Nulla hendrerit sem vitae posuere congue. Donec rhoncus dolor vel ante
        facilisis maximus. Etiam sagittis nisi ligula, in volutpat nibh bibendum
        vel. Nunc purus lacus, fringilla quis commodo nec, malesuada iaculis
        metus. Aliquam malesuada convallis nunc, ut lobortis augue rhoncus ac.
        Suspendisse mi tellus, tempus efficitur arcu ut, tincidunt ornare quam.
        Nunc ornare fringilla tortor, eget aliquam dui blandit ut. Proin
        pharetra, mi eget aliquam pharetra, lacus turpis fringilla felis, sed
        mattis dolor erat sit amet mi. Class aptent taciti sociosqu ad litora
        torquent per conubia nostra, per inceptos himenaeos. Donec facilisis
        dignissim congue. Aenean dapibus malesuada velit, a pretium enim aliquam
        non. Cras ac nisl mollis elit tempor luctus. Maecenas id arcu
        pellentesque, commodo nisi id, facilisis enim. Nunc sit amet massa
        metus. Praesent rutrum finibus tortor, ac faucibus purus ornare eu.
        Praesent fermentum mattis libero, eu placerat lacus malesuada in. Morbi
        libero nisi, sollicitudin nec nisl sed, rhoncus ultricies ipsum.
        Phasellus aliquam lorem in nulla aliquet, ut fermentum diam
        pellentesque. Nam vehicula tempus nunc vitae viverra. Mauris gravida
        lacinia mi, ut porta diam faucibus sed. Sed nisi orci, pellentesque ac
        rutrum nec, consectetur vitae elit. Etiam sed sagittis quam, quis
        dapibus tellus. Suspendisse nisi elit, efficitur blandit massa et,
        accumsan placerat sem. Quisque dapibus ligula velit, non venenatis diam
        ultrices vitae. Vestibulum vulputate hendrerit dolor, at aliquet massa.
        Etiam maximus in ligula ac dictum. Etiam semper nec nulla eu tempor.
        Nunc rutrum ac ligula in semper. Nulla facilisi. Suspendisse suscipit
        quam et eleifend volutpat. Mauris suscipit mi lectus, non elementum nunc
        fermentum sit amet. Nunc id ultricies massa, sed tempor mi. Integer
        elementum ex a magna vestibulum, id cursus eros sagittis. Cras ut
        pharetra ligula. Class aptent taciti sociosqu ad litora torquent per
        conubia nostra, per inceptos himenaeos. Etiam venenatis sit amet nisi in
        dignissim. Nunc sollicitudin ante sit amet neque pharetra, in venenatis
        nisl semper.
      </Typography>
    </Box>
  );
};
