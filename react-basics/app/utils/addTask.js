import CreateTaskObject from './createTaskObject';

export default function addTask(store, newName, id) {
  let newStore = [...store];
  function forStore(newStore) {
    if(newStore.length>0){
      newStore = newStore.map(function (item) {
        if(item.id == id) {
          return Object.assign({}, item, { task: [new CreateTaskObject(newName), ...item.task] });
        }

        return Object.assign({}, item, { nestedCategory: forStore(item.nestedCategory) });
      });
    }
    return newStore
  };

  return forStore(newStore);
}
