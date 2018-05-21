const Node = require('./node');

class LinkedList {
	constructor() {
		this._head = null;

		this._tail = null;

		this.length = 0; 
	}

	append(data) {
		var node;
		if (this.isEmpty()) {
			node = new Node(data);
			this._head = node;			
		}
		else {			
			node = new Node(data, this._tail);
			this._tail.next = node;
		}
		this._tail = node;
		this.length++;
		return this;		
	}

	head() {
		if (this._head)
			return this._head.data;
		else
			return null;
	}

	tail() {
		if (this._tail)
			return this._tail.data;
		else
			return null;
	}

	at(index) {
		var node,
 i;

		if (index > -1 && index < this.length) {
			node = this._head;

			i = 0;
			while (i < index) {

				node = node.next;

				i++;
			}
			return node.data;
		}
		return null; 
	}

	insertAt(index, data) {
		var node,
 i;

		if (index == 0 && this.length == 0)
			return this.append(data);
		if (index > -1 && index < this.length) {
			node = this._head;

			i = 0;
			while (i < index) {

				node = node.next;

				i++;
			}
		
			var newNode = new Node(data, node.prev, node);
			if (index > 0)
				node.prev.next = newNode;
			node.prev = newNode;
			if (index == 0)
				this._head = newNode;
			this.length++;
		}
		return this;		
	}

	isEmpty() {
		return (this.length == 0);
	}

	clear() {
		this._head = null;

		this._tail = null;

		this.length = 0;
		return this;
	}

	deleteAt(index) {
		var node,
 i;

		if (index == 0 && this.length == 1)
			return this.clear();
		if (index > -1 && index < this.length) {
			node = this._head;

			i = 0;
			while (i < index) {

				node = node.next;

				i++;
			}
		
			if (index == 0) {
				this._head = node.next;
				this._head.prev = null;
			}
			else
				node.prev.next = node.next;
			if (index == this.length-1 && index != 0) {
				this._tail = node.prev;
				this._tail.next = null;
			}
			else
				node.next.prev = node.prev;
			this.length--;
		}
		return this;
	}

	reverse() {
		var node = this._tail;
		
		var i = this.length-1;
		while (i >= 0) {

			if (i == this.length-1)
				this._head = node;
			if (i == 0)
				this._tail = node;
			var tmpNode = node.next;
			node.next = node.prev;
			node.prev = tmpNode;
			node = node.next;

			i--;
		}
		return this;
	}

	indexOf(data) {
		var node;
		var i = 0;
		var index = -1;
		node = this._head;
		
		while (i < this.length) {

			if (node.data == data) {
				index = i;
				break;
			}
			node = node.next;

			i++;
		}
		return index;
	}
}

module.exports = LinkedList;
