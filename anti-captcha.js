"use strict";
const axios = require("axios");

class Anticaptcha {
  constructor(api, interval = 3, retry = 10) {
    this.api = api;
    this.interval = interval;
    this.retry = retry;
  }

  getDefault(o) {
    return {
      phrase: o.phrase ? o.phrase : false,
      case: o.case ? o.case : false,
      numeric: o.numeric ? o.numeric : 0,
      math: o.math ? o.math : false,
      minLength: o.minLength ? o.minLength : 0,
      maxLength: o.maxLength ? o.maxLength : 0
    };
  }

  async sendCaptcha(captcha, obj) {
    if (obj !== undefined) {
      obj = this.getDefault(obj);
    }

    let res = await axios.post("https://api.anti-captcha.com/createTask", {
      clientKey: this.api,
      task: Object.assign(
        {},
        {
          type: "ImageToTextTask",
          body: captcha
        },
        obj
      )
    });
    if (res.status === 200 && res.data.errorId == 0) {
      return res.data.taskId;
    } else {
      console.log(res);
      return null;
    }
  }

  async getTaskResult(taskID) {
    let response = null;
    let res = await axios.post("https://api.anti-captcha.com/getTaskResult", {
      clientKey: this.api,
      taskId: taskID
    });
    return res.data ? res.data : null;
  }

  delay(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }
  async getResult(captcha, o) {
    let retryCount = 0;
    let taskId = await this.sendCaptcha(captcha, o === undefined ? {} : o);
    if (taskId === null) return null;
    let result = null;
    let c = 1;
    for (; c !== 0; ) {
      let taskResult = await this.getTaskResult(taskId);
      retryCount++;
      if (taskResult.errorId === 0 && taskResult.status === "ready") {
        result = taskResult.solution.text;
      }
      if (result !== null || retryCount >= this.retry) {
        c = 0; //stop
      } else {
        // continue
        await this.delay(this.interval * 1000); // in miliseconds
      }
    }

    return result;
  }
}

module.exports = Anticaptcha;
