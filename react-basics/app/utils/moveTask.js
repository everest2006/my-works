export default function moveTask(store, currentCategoryId, newCategoryId, currentTask) {
  let newStore = [...store];
  var date = {
    currentCategory: {},
    newCategory: {}
  };
  function forStore(newStore, date) {
    if(newStore.length>0){
      newStore.forEach(function (item) {
        if(item.id == currentCategoryId) {
          date.currentCategory = item;
        }
        if(item.id == newCategoryId) {
          date.newCategory = item;
        }
        forStore(item.nestedCategory, date);
      });
    }
    return date;
  }
  date = forStore(newStore, date);
  date.currentCategory.task = [...date.currentCategory.task.filter(function (t) {
    if ( t.id === currentTask ){
      date.newCategory.task = [...date.newCategory.task, Object.assign({}, t)];
      return false;
    }
    return true;
  })]
  return newStore;
}
