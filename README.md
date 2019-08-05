
# async-captcha
Automate the process of captcha solving for various services. 

**Current list of supported services:**   
[✔] [Anti-captcha](http://getcaptchasolution.com/4n22661zqv)

## Installation

    npm i async-captcha

## Usage
Include the module in your code:

    const captcha = require("async-captcha");
    
    // Parameters: (API_KEY:String, IntervalSeconds:Number, MaxRetry:Number)
    const anticaptcha = new captcha("YOUR_API_KEY",  2, 10);


### Async/await

   #### anticaptcha.getResult
   

    // Your image as base64 string
    const base64Image = "iVBORw0KGgoAAAANSUhEUg......lFTkSuQmCC="; 
    
    let  res  =  await  anticaptcha.getResult(base64Image);
    
    // res contains the solved captcha value
    console.log(res);
    // "pKwtH5"

<hr>

### Promises
Same as async/await, but using promises.
  
   #### anticaptcha.getResult

    anticaptcha.getResult(base64)    
    .then(res  =>  {    
       console.log(res);    
    })    
    .catch(err  =>  {    
       if (err) console.log(err);    
    });
