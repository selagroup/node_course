# Async Challenge

1. Refactor the following function to return a promise and not use callback.
    ```javascript
       let id=0;
       function RandomTimer(callback){
           
           id++
           let rand=(Math.random() * (5 - 1) + 1)*1000;
           setTimeout((id)=>{
               callback(id);
           },rand,id);
       }
    ```
2. Implement two functions:
    1. Parallel - receives an array of async functions and executes them in parallel. The function should return a promise once all functions have ended.
    The result of the promise should be an array of all the results.
        
        ```javascript
       module.exports.parallel = function(functions) {}        
        ```
    2. Series - receives an array of async functions and executes them one after another.The function should return a promise once all functions have ended.
        The result of the promise should be an array of all the results.
           
        ```javascript
       module.exports.series= function(functions) {}                   
        ```
3. you can use the ```Random timer``` function to test the ``parallel`` and ``series`` functions
    ```javascript
    series([
        RandomTimer,
        RandomTimer,
        RandomTimer
    ]).then((result)=>{
        console.log(result);
    })
    
    ```