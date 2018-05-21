export default function createCategoryObject(nameTask) {
  this.id = new Date().getTime();
  this.nameTask = nameTask;
  this.done = false;
  this.description = '';
  return this;
}
