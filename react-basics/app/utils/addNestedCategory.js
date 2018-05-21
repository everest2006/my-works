import CreateCategoryObject from './createCategoryObject';

export default function addNestedCategory(store, newName, id) {
  let newStore = [...store];
  function forStore(newStore) {
    if(newStore.length>0){
      newStore = newStore.map(function (item) {
        if(item.id == id) {
          return Object.assign({}, item, {nestedCategory: [new CreateCategoryObject(newName), ...item.nestedCategory]});
        }

        return Object.assign({}, item, {nestedCategory: forStore(item.nestedCategory)});
      });
    }
    return newStore
  };

  return forStore(newStore);
}
