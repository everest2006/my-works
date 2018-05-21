
export default function removeCategory(store, id) {
  let newStore = [...store];
  function forStore(newStore) {
    if(newStore.length > 0) {
      newStore = newStore.filter(function (item) {
        if(item.id !== +id) {
          item.nestedCategory = [...forStore(item.nestedCategory)];
          return true;
        }
        return false;
      });
    }
    return newStore;
  }

  return forStore(newStore);
}
