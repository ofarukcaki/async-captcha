# async-captcha

Automate the process of captcha solving for various services.       

**See my related Medium post: [Solving Captchas with Puppeteer](https://medium.com/@ofarukcaki/solving-captchas-with-puppeteer-8ce2521feb3b)**

**Current list of supported services:**  
[✔][anti-captcha](http://getcaptchasolution.com/4n22661zqv)

## Installation

    npm i async-captcha

## Usage

Include the module in your code:

```javascript
const captcha = require("async-captcha");

// Parameters: (API_KEY:String, IntervalSeconds:Number, MaxRetry:Number)

const anticaptcha = new captcha("YOUR_API_KEY", 2, 10);
```

### Async/await

#### anticaptcha.getResult

```javascript
// Your image as base64 string
const base64Image = "iVBORw0KGgoAAAANSUhEUg......lFTkSuQmCC=";

let res = await anticaptcha.getResult(base64Image, options);

// res contains the solved captcha value
console.log(res);
// "pKwtH5"
```

<hr>

### Promises

Same as async/await, but using promises.

#### anticaptcha.getResult

```javascript
anticaptcha
  .getResult(base64)
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    if (err) console.log(err);
  });
```

### Custom Properties

##### You can pass additional properties as 2nd parameter of .getResult() method in form of object. If you don't pass any parameters it'll use default values instead

Here are available parameters:

| Property  | Type    | Default |
| --------- | ------- | ------- |
| phrase    | Boolean | false   |
| case      | Boolean | false   |
| numeric   | Integer | 0       |
| math      | Boolean | false   |
| minLength | Integer | 0       |
| maxLength | Integer | 0       |
^ Detailed descriptions can be found [here](https://anticaptcha.atlassian.net/wiki/spaces/API/pages/5079091/ImageToTextTask+solve+usual+image+captcha).


```javascript
// Your image as base64 string
const base64Image = "iVBORw0KGgoAAAANSUhEUg......lFTkSuQmCC=";

const options = {
  case: true,
  minLength: 5,
  maxLength: 5
};

let res = await anticaptcha.getResult(base64Image, options);

// res contains the solved captcha value
console.log(res);
// "pKwH5"
```
