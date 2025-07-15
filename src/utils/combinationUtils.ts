import { Selection, InvalidCombination } from '../features/lists/listsSlice';

/**
 * Checks if a selection matches an invalid combination
 * @param selection - The current selection to validate
 * @param invalidCombination - The invalid combination to check against
 * @returns true if the selection matches the invalid combination
 */
export const isSelectionInvalidCombination = (
  selection: Selection[], 
  invalidCombination: InvalidCombination
): boolean => {
  // An invalid combination must have at least 2 items
  if (invalidCombination.items.length < 2) {
    return false;
  }

  // Group invalid combination items by list ID
  const invalidItemsByList = invalidCombination.items.reduce((acc, item) => {
    if (!acc[item.listId]) {
      acc[item.listId] = [];
    }
    acc[item.listId].push(item);
    return acc;
  }, {} as { [key: string]: Selection[] });

  // Get the lists that have invalid combinations defined
  const invalidListIds = Object.keys(invalidItemsByList);
  
  // Check if the selection contains at least one item from each list that has invalid combinations
  return invalidListIds.every(listId => {
    const invalidItemsForList = invalidItemsByList[listId];
    
    // Check if the current selection has any item from this list that matches the invalid items
    return selection.some(selectionItem => 
      selectionItem.listId === listId &&
      invalidItemsForList.some(invalidItem => 
        invalidItem.itemId === selectionItem.itemId
      )
    );
  });
};

/**
 * Checks if a selection matches any invalid combination
 * @param selection - The current selection to validate
 * @param invalidCombinations - Array of invalid combinations to check against
 * @returns true if the selection matches any invalid combination
 */
export const isSelectionInvalid = (
  selection: Selection[], 
  invalidCombinations: InvalidCombination[]
): boolean => {
  if (!invalidCombinations || invalidCombinations.length === 0) {
    return false;
  }
  
  return invalidCombinations.some(invalidCombination => 
    isSelectionInvalidCombination(selection, invalidCombination)
  );
};

/**
 * Generates a random selection that avoids invalid combinations
 * @param lists - Available lists to select from
 * @param invalidCombinations - Invalid combinations to avoid
 * @param maxAttempts - Maximum number of attempts before giving up
 * @returns A valid selection or null if no valid combination found
 */
export const generateValidRandomSelection = (
  lists: any[], 
  invalidCombinations: InvalidCombination[], 
  maxAttempts: number = 100
): Selection[] | null => {
  // If no invalid combinations are defined, generate a simple random selection
  if (!invalidCombinations || invalidCombinations.length === 0) {
    const selection: Selection[] = [];
    lists.forEach(list => {
      if (list.items.length > 0) {
        const randomIndex = Math.floor(Math.random() * list.items.length);
        const item = list.items[randomIndex];
        
        selection.push({
          listId: list.id,
          itemId: item.id,
          value: item.value
        });
      }
    });
    return selection;
  }

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const selection: Selection[] = [];
    
    // Generate a random selection
    lists.forEach(list => {
      if (list.items.length > 0) {
        const randomIndex = Math.floor(Math.random() * list.items.length);
        const item = list.items[randomIndex];
        
        selection.push({
          listId: list.id,
          itemId: item.id,
          value: item.value
        });
      }
    });

    // Check if this selection is valid
    if (!isSelectionInvalid(selection, invalidCombinations)) {
      return selection;
    }
  }

  // If we couldn't find a valid combination after max attempts, return null
  return null;
}; 