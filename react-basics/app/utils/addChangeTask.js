
export default function addChangeTask(store, obj, categoryId, taskId) {
  let newStore = [...store];
  function forStore(newStore) {
    if(newStore.length>0){
      newStore = newStore.map(function (item) {
        if(item.id == categoryId) {
          return Object.assign({}, item, { task: item.task.map(t=> {
            if(t.id === taskId){
              return Object.assign({}, t, obj);
            }
            return t;
          }) });
        }

        return Object.assign({}, item, { nestedCategory: forStore(item.nestedCategory) });
      });
    }
    return newStore;
  };

  return forStore(newStore);
}
