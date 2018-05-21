function Node(key, value) {
    this.key = key;
    this.value = value;

    this.left = null;
    this.right = null;
}

function BinarySearchTree() {
    this._root = null;

    this.root = function() {
        if (this._root){
            return this._root.value;
        }
        return null;
    };

    this.insert = function(index, name) {
        function recurs(root,ind,nam) {
            if(root.key>ind){
                if(root.left===null) {
                    root.left = new Node(ind, nam);
                }else{
                    recurs(root.left,ind,nam);
                }
            }
            if(root.key<ind){
                if(root.right===null) {
                    root.right = new Node(ind, nam);
                }else{
                    recurs(root.right,ind,nam);
                }
            }
            if(root.key===ind){
                root.value=nam;
            }
        }
        if (this._root===null) {
            this._root = new Node(index, name);
        }else{
            recurs(this._root,index,name);
        }
        return this;
    };

    this.search = function(index) {
        var curNode = this._root;
        while(curNode) {
            if (curNode.key === index) {
                return curNode.value;
            }
            else if (curNode.key < index)
                curNode = curNode.right;
            else
                curNode = curNode.left;
        }
    };

    this.delete = function (key) {
        var head_node, child;

        function cicle(root, k) {
            if (root.key<k){
                if(root.right.key===k){
                    head_node = root;
                    child = "right";
                }
                cicle(root.right, k);

            }
            if (root.key>k){
                if(root.left.key===k){
                    head_node = root;
                    child = "left";
                }
                cicle(root.left, k);
            }
            if(root.key===k){
                if(!root.right&&!root.left){
                    if(head_node===undefined){
                    }else {
                        head_node[child] = undefined;
                    }
                }else if((root.right&&!root.left)||(!root.right&&root.left)){
                    root.right?head_node[child]=root.right:head_node[child]=root.left;
                }else if(root.right&&root._left){
                    if(!root.right.left){
                        root.right.left=head_node[child].left;
                        head_node[child]=root.right;
                    }else{
                        var node=root.right;
                        var prev_node;
                        while (node.left){
                            prev_node = node;
                            node=node.left;
                        }
                        head_node[child].key=node.key;
                        head_node[child].value = node.value;
                        prev_node.left=undefined;
                    }
                }
            }
        }
        if (this._root){
            if(this._root.key==key){
                if(this._root.right) {
                    var parentNode = this._root;
                    var childNode = this._root.right;
                    while (childNode.left) {
                        parentNode = childNode;
                        childNode = childNode.left;
                    }
                        this._root.key = childNode.key;
                        this._root.value = childNode.value;
                        if(childNode.right){
                            parentNode.left = childNode.right;
                        }

                }else {
                    this._root = this._root.left;
                }
            }else {
                cicle(this._root, key);
            }
        }
        return this;
    };

    this.contains = function (value) {
        var bool = false;
        function search_value(root, val) {
            if (root.value === val){
                bool=true;
            }else{
                if (root.right){search_value(root.right, val);}
                if(root.left){search_value(root.left, val);}
            }
        }
        if (this._root){search_value(this._root, value);}
        return bool;
    };

    this.verify = function () {
        var bool = true;
        function verify_tree(root) {
            if(root.left){
                if(root.key>root.left.key){
                    verify_tree(root.left);
                }else{bool=false}
            }
            if(root.right){
                if(root.key<root.right.key){
                    verify_tree(root.right);
                }else{bool=false}
            }
        }
        if(this._root){verify_tree(this._root);}
        return bool;
    };

    this.traverse = function (order) {
        var str ="";

        function orderTrue(root) {
            let string= root.value;
            if (root.right&&(!root.left)){
                return string+","+ orderTrue(root.right);
            }
            if(root.left&&(!root.right)){
                return orderTrue(root.left)+","+string;
            }
            if(root.left&&root.right){
                return orderTrue(root.left)+","+string+","+orderTrue(root.right);
            }
            return string;
        }

        if(order){
            str = orderTrue(this._root.left)+","+this._root.value+","+orderTrue(this._root.right);
            return str.split(',');
        }else{
            str = orderTrue(this._root.left)+","+this._root.value+","+orderTrue(this._root.right);
            return str.split(',').reverse();
        }

    };
}


module.exports = {
  BinarySearchTree,

  //WARNING!!!
  //PROVIDE BST STRUCTURE FOR TESTS {STRING}
  root: '_root',
  left: 'left',
  right: 'right',
  //NAME FOR REPORTS
  student: 'Yury'
};
