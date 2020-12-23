function checkCashRegister(price, cash, cid) {
    let each = {
      "PENNY" : 0.01,
      "NICKEL" : 0.05,
      "DIME" : 0.1,
      "QUARTER" : 0.25,
      "ONE" : 1,
      "FIVE" : 5,
      "TEN" : 10,
      "TWENTY" : 20,
      "ONE HUNDRED" : 100
    }
    let isSame = (arr1, arr2) => {
      for (let k=0; k<arr1.length; k++) {
        if (arr2.includes(arr1[k])) {
          return false;
        }
      }
      return true;
    }
  
    let diff = cash - price;
    let change = [];
    let status, multiplier;
    for (let i=cid.length-1; i>=0; i--) {
      multiplier = 0;
      while(cid[i][1]-each[cid[i][0]]*multiplier>0 && diff>=each[cid[i][0]]) {
  
        diff = diff - each[cid[i][0]];
        diff = diff.toFixed(2);
        multiplier++;
  
      }
      change.push([cid[i][0], each[cid[i][0]]*multiplier])
    }
    
    if (diff == 0) {
      let sum = cid.reduce((total, x) => total+x[1], 0);
      if (sum == cash-price) {
        return {status : "CLOSED", change : cid};
      } 
      return {status : "OPEN", change : change.filter((elem) => elem[1] != 0)};
    } else {
      return {status: "INSUFFICIENT_FUNDS", change: []};
    }
  }
  

console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
// should return {status: "OPEN", change: [["QUARTER", 0.5]]}.

console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
// should return {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}.

console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
// should return {status: "INSUFFICIENT_FUNDS", change: []}.

console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
// should return {status: "INSUFFICIENT_FUNDS", change: []}.

console.log(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
// should return {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}.