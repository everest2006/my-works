
export default function createCategoryObject(nameCategory) {
  this.id = new Date().getTime();
  this.nameCategory = nameCategory;
  this.nestedCategory = [];
  this.task = [];
  return this;
}
