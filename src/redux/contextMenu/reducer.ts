import { closeContextMenu, openContextMenu } from './actions';
import { ContextMenuActions, ContextMenuState } from './types';

const defaultState: ContextMenuState = {
  anchor: undefined,
  bounds: undefined,
  options: [],
  // TODO: Add origin window name to know where context menu is attached,
  //       will be needed if context menu is attached to
  //       a window other than the main app launcher
};

export default (state: ContextMenuState = defaultState, action: ContextMenuActions) => {
  switch (action.type) {
    case openContextMenu.success.toString(): {
      const { anchor, bounds, options } = action.payload;
      return {
        ...state,
        anchor,
        bounds,
        options,
      };
    }
    case closeContextMenu.success.toString(): {
      return defaultState;
    }
    default: {
      return state;
    }
  }
};
