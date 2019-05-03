import {
  BASE_URL_UPDATE,
  TOGGLE_CODE,
  TOGGLE_MENU,
} from './navigation-actions';

import initialState from './navigation-initial-state'

export default function navigationReducer(state = initialState, action) {
  switch (action.type) {
    // Set the current app url
    case BASE_URL_UPDATE:
      return {
        ...state,
        base_url: action.payload,
      };

    // Toggle component's code display
    case TOGGLE_CODE:
      return {
        ...state,
        showAllCode: !state.showAllCode,
      };

    // Toggle mobile navigation (sidebar)
    case TOGGLE_MENU:
      return {
        ...state,
        showMenu: !state.showMenu,
      };
    default: return state;
  }
}