const passwordLengthRange = document.getElementById("passwordLengthRange");
const passwordLengthNumber = document.getElementById("passwordLengthNumber");
const passwordGeneratorForm = document.getElementById("passwordGeneratorForm");
const includeLowercaseElement = document.getElementById("includeLowercase");
const includeUppercaseElement = document.getElementById("includeUppercase");
const includeNumbersElement = document.getElementById("includeNumbers");
const includeSymbolsElement = document.getElementById("includeSymbols");
const displayPasswordBox = document.getElementById("displayPasswordBox")
const generateButton = document.getElementById("generateButton");
const copyButton = document.getElementById("copyButton")

passwordLengthRange.addEventListener("input", syncPasswordLengthAmount);
passwordLengthNumber.addEventListener("input", syncPasswordLengthAmount);

function syncPasswordLengthAmount(e) {
    const value = e.target.value;
    passwordLengthRange.value = value;
    passwordLengthNumber.value = value;
}

generateButton.addEventListener("click", e => {
    e.preventDefault();
    const passwordLength = passwordLengthNumber.value;
    const includeLowercase = includeLowercaseElement.checked;
    const includeUppercase = includeUppercaseElement.checked;
    const includeNumbers = includeNumbersElement.checked;
    const includeSymbols = includeSymbolsElement.checked;
    const password = generatePassword(passwordLength, includeLowercase, includeUppercase, includeNumbers, includeSymbols)
    displayPassword(password) ;
})

copyButton.addEventListener('click', e=>{
    e.preventDefault();
    copyPassword();
})

function generatePassword(passwordLength, includeLowercase, includeUppercase, includeNumbers, includeSymbols) {
    if (!includeLowercase && !includeUppercase && !includeNumbers && !includeSymbols) {
        alert("Please at least choose one character!")
        return '';
    } 
    const symbol = ["!", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", "\:", "\;", "<", "=", ">", "?", "@", "[", "\\", "]", "^", "_", "`", "{", "|", "}", "~"];
    const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const lowerCase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    const upperCase = lowerCase.map(e=>(e.toUpperCase()));
   
    var result = [];
    includeLowercase ? result = result.concat(lowerCase) : result;
    includeUppercase ? result = result.concat(upperCase) : result; 
    includeNumbers ? result = result.concat(number) : result;
    includeSymbols ? result = result.concat(symbol) : result;
   
    var resultStr = result.join('');
    var passwordRandom = '';

    for(var i=0; i<passwordLength; i++){
        var randomNum = Math.floor(Math.random()*resultStr.length);
        passwordRandom += resultStr.substring(randomNum, randomNum+1)
    }
    return passwordRandom;    
}

function displayPassword(password){
    displayPasswordBox.innerHTML=password;
}

function copyPassword(){
    if(displayPasswordBox.innerHTML==='') {
        alert('Please generate password first.');
        return '';
    }
    var content = displayPasswordBox;
    content.select();
    document.execCommand('copy')
    alert(`Password copied to clipboard!`);
}


