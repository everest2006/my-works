
export default function getTask(store, id) {
  var task='';
   store.forEach(function (item) {
    if (item.id === +id) {
      if(item.task.length > 0) {
        task = [...item.task.filter(t => t)];
      }
    }else {
      if(item.nestedCategory.length>0) {
        task = [...getTask(item.nestedCategory, id)];
      }
    }
  });
return task;
}
