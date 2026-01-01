export const MenuActions = {
  Close: 0,
  CloseSelect: 1,
  First: 2,
  Last: 3,
  Next: 4,
  Open: 5,
  PageDown: 6,
  PageUp: 7,
  Previous: 8,
  Select: 9,
  Type: 10,
};

export function filterOptions(
  options: string[] = [],
  filter: string,
  exclude: string[] = []
) {
  return options.filter((option) => {
    const matches = option.toLowerCase().indexOf(filter.toLowerCase()) === 0;
    return matches && exclude.indexOf(option) < 0;
  });
}

export function getActionFromKey(event: KeyboardEvent, menuOpen: boolean) {
  const { key, altKey, ctrlKey, metaKey } = event;
  const openKeys = ['ArrowDown', 'ArrowUp', 'Enter', ' '];

  if (!menuOpen && openKeys.includes(key)) {
    return MenuActions.Open;
  }

  if (key === 'Home') {
    return MenuActions.First;
  }
  if (key === 'End') {
    return MenuActions.Last;
  }

  if (
    key === 'Backspace' ||
    key === 'Clear' ||
    (key.length === 1 && key !== ' ' && !altKey && !ctrlKey && !metaKey)
  ) {
    return MenuActions.Type;
  }

  if (menuOpen) {
    if (key === 'ArrowUp' && altKey) {
      return MenuActions.CloseSelect;
    } else if (key === 'ArrowDown' && !altKey) {
      return MenuActions.Next;
    } else if (key === 'ArrowUp') {
      return MenuActions.Previous;
    } else if (key === 'PageUp') {
      return MenuActions.PageUp;
    } else if (key === 'PageDown') {
      return MenuActions.PageDown;
    } else if (key === 'Escape') {
      return MenuActions.Close;
    } else if (key === 'Enter' || key === ' ') {
      return MenuActions.CloseSelect;
    }
  }
  return undefined;
}

export function getIndexByLetter(
  options: string[],
  filter: string,
  startIndex = 0
) {
  const orderedOptions = [
    ...options.slice(startIndex),
    ...options.slice(0, startIndex),
  ];
  const firstMatch = filterOptions(orderedOptions, filter)[0];
  const allSameLetter = (array: string[]) =>
    array.every((letter) => letter === array[0]);

  if (firstMatch) {
    return options.indexOf(firstMatch);
  } else if (allSameLetter(filter.split(''))) {
    const matches = filterOptions(orderedOptions, filter[0]);
    return options.indexOf(matches[0]);
  } else {
    return -1;
  }
}

export function getUpdatedIndex(
  currentIndex: number,
  maxIndex: number,
  action: number
) {
  const pageSize = 10;

  switch (action) {
    case MenuActions.First:
      return 0;
    case MenuActions.Last:
      return maxIndex;
    case MenuActions.Previous:
      return Math.max(0, currentIndex - 1);
    case MenuActions.Next:
      return Math.min(maxIndex, currentIndex + 1);
    case MenuActions.PageUp:
      return Math.max(0, currentIndex - pageSize);
    case MenuActions.PageDown:
      return Math.min(maxIndex, currentIndex + pageSize);
    default:
      return currentIndex;
  }
}

export function scrollItemIntoView(
  menu: HTMLElement,
  item: HTMLElement,
  paddingY: number = 0
) {
  if (!menu) return;

  // Basic scroll into view logic
  const menuRect = menu.getBoundingClientRect();
  const itemRect = item.getBoundingClientRect();

  if (itemRect.bottom + paddingY > menuRect.bottom) {
    menu.scrollTop += itemRect.bottom - menuRect.bottom + paddingY;
  } else if (itemRect.top - paddingY < menuRect.top) {
    menu.scrollTop -= menuRect.top - itemRect.top + paddingY;
  }
}
