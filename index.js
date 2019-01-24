// Ryan Domoslai

/**
 * Calculates the numerical sum of a properly formatted inputted string and returns it as an integer.
 * @param {string} input - The input string, separated either by the specified special delimiter "//delim\n" or "," by default.
 */
function add(input) {
    if (input.length == 0) {
        return 0;
    }
    
    let delim = ",";
    if (input.substring(0, 2) == "//") {        // Can assume delimEnd is there if the start is.
        delim = "";
        let delimEnd = input.indexOf("\n");
        for (let i = 2; i < delimEnd; i++) {     // Won't work if delimiter is \n
            delim += input[i];
        }
        input = input.substring(delimEnd);
    } else {
        input = input.replace(/\n/g, '');
    }

    let nums = input.split(delim).map(checkNumber);
    let sum = nums.reduce((a, b) => a + b, 0);
    return parseInt(sum);
}

/**
 * Callback for map which converts valid strings into numbers. If not valid, throws the relevant error.
 * @param {string} strNum - The string which should represent a valid number. 
 */
function checkNumber(strNum) {
    let num = Number(strNum);
    if (isNaN(num)) {
        throw TypeError("Error, string substring cannot be converted to a number.")
    } else if (num < 0) {
        throw new NegativeError("Negatives not allowed: " + String(num))
    } else if (num > 1000) {
        num = 0;
    }
    return num;
}

/**
 * Tests the add function against it's expected output.
 * @param {string} string - The string to be passed as a param to the add function.
 * @param {number} out - The expected output of the add function run with the string param.
 */
function tester(string, out) {
    let result = add(string);
    if (result !== out) {
        throw new Error("String " + string + " returned " + String(result) + " expected " + String(out));
    }
}

// For checking function output.
const testCases = [
    ["", 0],
    ["1", 1],
    ["1,2,5", 8],
    ["5,0,7", 12],
    ["8,,2", 10],
    ["1,2,3,4,5", 15],
    ["1\n,4", 5],
    ["1\n,4\n", 5],
    ["1\n,2,3", 6],
    ["//;\n1;3;4", 8],
    ["//$\n1$2$3", 6],
    ["2, 1001", 2],
    ["//***\n1***2***3", 6],

]

// For checking if checkNumber properly throws. 
const throwCases = [
    "-1",
    "4,-1",
    "4,-100,10",
    "//AAB\n1,2,3"
]

let errorCount = 0;
for (let i = 0; i < testCases.length; i++) {
    let string = testCases[i][0];
    let out = testCases[i][1];
    try {
        tester(string, out);
    } catch (err) {
        console.log(err.message);
        errorCount += 1;
    }
}
console.log("Of " + String(testCases.length) + " test cases " + 
    String(testCases.length - errorCount) + " completed successfully.");

errorCount = 0;
for (let i = 0; i < throwCases.length; i++) {
    try {
        add(throwCases);
    } catch (err) {
        errorCount += 1;
    }
}
console.log("Of " + String(throwCases.length) + " throw cases " + String(errorCount) + " successfully threw.");
