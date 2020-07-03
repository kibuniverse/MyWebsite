# 手把手带你实现ES6 Promise原理(使用Es6部分语法编写)

## 一、前言

使用Promise已经很长时间了，但是一直只是停留在应用的层面，底层的实现方式一直没有深究，感觉学一个东西还是知道底层原理比较好，于是好好研究后在此记录一下



## 二、什么是Promise?

Promise是一种异步编程的解决方案，避免了"回调地狱"，最早是由社区提出并实现，ES6后面将其写入语言标准。

### Promise的两个特点

1. 对象的状态不受外界影响，`Promise`对象代表一个异步操作，有三种状态：`pending`（进行中）、`fulfilled`（已成功）和`rejected`（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是`Promise`这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。
2. 一旦状态改变就不会再变，任何时候都可以得到这个结果。`Promise`对象的状态改变，只有两种可能：从`pending`变为`fulfilled`和从`pending`变为`rejected`。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对`Promise`对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。



## 三、Promise基本用法

Promise对象是一个构造函数，用来生成Promise实例

```javascript
let promise = new Promise((resolve, reject) => {
    if(/* 异步操作成功 */) {
    	reslove(value);   
    } else {
    	reject(err);                      
    }
})
```

`Promise`构造函数接受一个函数作为参数，该函数的两个参数分别是`resolve`和`reject`。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。

`resolve`函数的作用是，将`Promise`对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；`reject`函数的作用是，将`Promise`对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

`Promise`实例生成以后，可以用`then`方法分别指定`resolved`状态和`rejected`状态的回调函数。

之后更多的使用方法可以参考[这里](https://es6.ruanyifeng.com/#docs/promise)



## 四、手写`Promise`

> 在手写之前请确保已经了解`Promise`的基本用法， 并且我们这次只实现`Promise`的`then`方法，其余的`all`, `race`, `fianlly`方法大家可以举一反三，用自己的想法实现

首先我们知道每个Promise内部有三个状态(`pending`, `fulfilled`, `rejected`)，因此我们先定义储存状态的变量 `status`并将其初始化为`pending`

```javascript
class Promise {
	// 接收一个函数作为参数
	constructor(excutor) {
		this.status = 'pending';
	}
}
```

其次我们定义一下改变`status`状态的函数`reslove`和`reject`以及传入的参数`value`和`reseaon`

```js
class Promise {
	// 接收一个函数作为参数
	constructor(excutor) {
		this.status = 'pending';
        this.value = null;
        this.reason = null;
        this.resolve = value => {   // 使用箭头函数防止this指向改变
            if(this.status == 'pending') {
                this.value = value;
                this.status = 'fulfilled';
            }
        }
        this.reject = reason => {
            if(this.status == 'pending') {
                this.reason = reason;
                this.status = 'rejected';
            }
		}
    }
}
```

定义相关的变量以及函数将其作为参数传入函数

```js
class Promise {
	// 接收一个函数作为参数
	constructor(excutor) {
		this.status = 'pending';
        this.value = null;
        this.reason = null;
        this.resolve = value => {   // 使用箭头函数防止this指向改变
            if(this.status == 'pending') {
                this.value = value;
                this.status = 'fulfilled';
            }
        }
        this.reject = reason => {
            if(this.status == 'pending') {
                this.reason = reason;
                this.status = 'rejected';
            }
        }
        try {
            excutor(this.resolve, this.reject);
        } catch(err) {
            this.reject(err);
    }
}
```

然后开始写`Promise`的`then`方法, `Promise`收一个函数作为参数，该函数有两个参数，一个是`resolve`，表示成功时执行的函数，一个是`reject`，表示失败失败时执行的函数。`resolve`执行时传入的参数会作为`then`方法中第一个回调函数的参数，`reject`执行传入的参数会作为`then`方法中第二函数回调的参数。

```js
class Promise {
	// 接收一个函数作为参数
	constructor(excutor) {
		this.status = 'pending';
        this.value = null;
        this.reason = null;
        this.resolve = value => {   // 使用箭头函数防止this指向改变
            if(this.status == 'pending') {
                this.value = value;
                this.status = 'fulfilled';
            }
        }
        this.reject = reason => {
            if(this.status == 'pending') {
                this.reason = reason;
                this.status = 'rejected';
            }
        }
        try {
            excutor(this.resolve, this.reject);
        } catch(err) {
            this.reject(err);
        }
    }
   	
    then(onFulfilled, onRejected) {
        if(this.status === 'fulfilled') {
			onFulfilled(this.value);
		}
		if(this.status === 'rejected') {
			onRejected(this.reason);
		}
    }
}
```

至此，我们已经完成了`Promise`的大体框架，但是由于`js`异步的特性，可能会出执行`then`方法的时候`status`还是初始的`pending`状态,  所以为了能取得参数，我们在`then`方法中判断当`status`为`pending`时，将传入的函数记录下来，之后在`reslove`中执行提前记录的函数

```js
class Promise {
	// 接收一个函数作为参数
	constructor(excutor) {
		this.status = 'pending';
        this.value = null;
        this.reason = null;
        this.onFulfilledCallbacks = [];  // 用来记录传入then的状态变为fulfilled的函数
		this.onRejectedCallbacks = [];	// 用来记录传入then的状态变为reject的函数
        this.resolve = value => {   // 使用箭头函数防止this指向改变
            if(this.status == 'pending') {
                this.value = value;
                this.status = 'fulfilled';
            }
        }
        this.reject = reason => {
            if(this.status == 'pending') {
                this.reason = reason;
                this.status = 'rejected';
            }
        }
        try {
            excutor(this.resolve, this.reject);
        } catch(err) {
            this.reject(err);
        }
    }
   	
    then(onFulfilled, onRejected) {
        if(this.status === 'fulfilled') {
			onFulfilled(this.value);
		}
		if(this.status === 'rejected') {
			onRejected(this.reason);
		}
        if(this.status === 'pending') {
          	// 异步 先执行了 then， 但是此时status还未改变， 将传入的函数记录下来，之后在reslove或者reject中执行
            this.onFulfilledCallbacks.push(onFulfilled);
           	this.onRejectedCallbacks.push(onRejected);
        }
    }
}
```

到这里， 我们就可以实现基本的调用了，包括在Promise内部使用异步逻辑以及之后`then`方法

下面展示一个例子

```js
let p = new Promise((resolve, reject) => {
	setTimeout(() => {
		console.log('tom');
		resolve('jerry');
	}, 1000);
})	
p.then(value => {
	console.log(value);
}, err => {
	console.log(err);
})
```

在这里例子中我们测试了上面我们写的`Promise`,并在`Promise`中异步改变`status`,之后再`then`中打印

执行结果

![1592318405949](C:\Users\asus\AppData\Roaming\Typora\typora-user-images\1592318405949.png)

符合我们的预期

## 链式调用

`Promise`之所以可以避免回调地狱的也得益于它的链式调用特性，当执行`then`完成后可以继续执行`then`方法，其原理就是通过返回一个新的`Promise`实现的，如下

```js
then(onFulfilled, onRejected) {
    if(this.status === 'fulfilled') {
        return new Promise((reslove, reject) => {
            onFulfilled(this.value);
        })
    }
    
    if(this.status === 'rejected') {
        return new Promise((reslove, reject) => {
            onRejected(this.reason);
        }) 
    }
    
    if(this.status === 'pending') {
        return new Promise((reslove, reject) => {
            this.onFulfilledCallbacks.push(onFulfilled);
        	this.onRejectedCallbacks.push(onRejected);
        })
    }
}
```

上面是基本的思想

接下来我们通过判断传入`then`中函数的返回值判断应该执行哪种方法， 思路我会在代码中给出注释

```js
then(onFulfilled, onRejected) {
    if(this.status === 'fulfilled') {
        return new Promise((reslove, reject) => {
            try {
                let retFun = onFulfilled(this.value); // 得到返回的值
                if(retFun instanceof Promise) {  
                    // 若返回的为Promise实例，则执行链式then函数
                    retFun.then(reslove, reject);
                } else {
                    reslove(retFun); // 否则直接改变状态并将返回的值传递下去
                }
            } catch(err) {
                reject(retFun);
            }
            
        })
    }

    if(this.status === 'rejected') {
        return new Promise((reslove, reject) => {
            try {
                let retFun = onRejected(this.value);
                if(retFun instanceof Promise) {
                    retFun.then(reslove, reject);
                } else {
                    reslove(retFun);
                }
            } catch(err) {
				reject(err);
            }
            
        }) 
    }

    if(this.status === 'pending') {
        return new Promise((reslove, reject) => {
            this.onFulfilledCallbacks.push(() => {
                let retFun = onFulfilled(this.value);
                if(retFun instanceof Promise) {
                    retFun.then(reslove, reject);
                } else {
                    reslove(retFun);
                }
            });
            this.onRejectedCallbacks.push(() => {
                let retFun = onRejected(this.value);
                if(retFun instanceof Promise) {
                    retFun.then(reslove, reject);
                } else {
                    reject(retFun);
                }
            });
        })
    }
}
```

接下来我们测试一下上面的代码

```js
let p = new MyPromise((resolve, reject) => {
	setTimeout(() => {
		console.log('tom');
		resolve('jerry');
	}, 1000);
})	

p.then(value => {
	console.log(value);
	return new Promise((reslove, reason) => {
		reject(1);
	})
}, err => {
	console.log(err);
	return 'err';
}).then(reslove => {
	console.log(reslove);
}, reject => {
    console.log(reject);
})
```

![1592321931015](C:\Users\asus\AppData\Roaming\Typora\typora-user-images\1592321931015.png)

运行正常

注意不管是成功时的回调还是失败时的回调，都有`try/catch`包裹，不管成功还是失败都会被下一次`resolve`接收到，只有代码报错才会执行`reject`，处理特殊情况，`then`中没有传成功时的回调函数或失败时的回调函数，代码会报错，所以要指定默认值

```js
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled :   data => {return data}
  onRejected = typeof onRejected === 'function' ? onRejected : err => {throw err}
```

到这里我相信大家已经对`Promise`的实现原理有了一定的理解，大家也可以根据自己的理解实现`Promise`的其他方法。

## 五、完整代码

```js
class MyPromise {
	// 接收一个函数作为参数
	constructor(excutor) {
		this.status = 'pending';
		this.value = null;
		this.reason = null;
		this.onFulfilledCallbacks = [];
		this.onRejectedCallbacks = [];
		this.resolve = (value) => {
			if(this.status == 'pending') {
				this.value = value;
				this.status = 'fulfilled';
				this.onFulfilledCallbacks.forEach(item => item(this.value));
			}
		}
		this.reject = (reason) => {
			if(this.status == 'pending') {
				this.reason = reason;
				this.status = 'rejected';
				this.onRejectedCallbacks.forEach(item => item(this.reason));
			}
		}
		try {
			excutor(this.resolve, this.reject);
		} catch(err) {
			this.reject(err);
		}
	}
	then(onFulfilled, onRejected) {
		onFulfilled = typeof onFulfilled === 'function' ? onFulfilled :  function (data) {return data}
 		onRejected = typeof onRejected === 'function' ? onRejected : function (err) {throw err}
		if(this.status === 'fulfilled') {
	        return new Promise((reslove, reject) => {
	            try {
	                let retFun = onFulfilled(this.value); // 得到返回的值
	                if(retFun instanceof Promise) {  
	                    // 若返回的为Promise实例，则执行链式then函数
	                    retFun.then(reslove, reject);
	                } else {
	                    reslove(retFun); // 否则直接改变状态并将返回的值传递下去
	                }
	            } catch(err) {
	                reject(err);
	            }
	        })
	    }

	    if(this.status === 'rejected') {
	        return new Promise((reslove, reject) => {
	            try {
	                let retFun = onRejected(this.value);
	                if(retFun instanceof Promise) {
	                    retFun.then(reslove, reject);
	                } else {
	                    reslove(retFun);
	                }
	            } catch(err) {
					reject(err);
	            }
	            
	        }) 
	    }

	    if(this.status === 'pending') {
	        return new Promise((reslove, reject) => {
	            this.onFulfilledCallbacks.push(() => {
	                let retFun = onFulfilled(this.value);
	                if(retFun instanceof Promise) {
	                    retFun.then(reslove, reject);
	                } else {
	                    reslove(retFun);
	                }
	            });
	            this.onRejectedCallbacks.push(() => {
	                let retFun = onRejected(this.value);
	                if(retFun instanceof Promise) {
	                    retFun.then(reslove, reject);
	                } else {
	                    reslove(retFun);
	                }
	            });
	        })
	    }
	}
}
```

