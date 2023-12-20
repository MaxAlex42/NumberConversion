let inputField = document.getElementById("input");
let calcButton = document.getElementById("convButton");
let config = document.getElementById("selector");
let reset = document.getElementById("reset");

calcButton.addEventListener("click", () => {
  const inputValue = inputField.value.trim();

  if (inputValue === "") {
    alert("Input is empty. Please enter a value.");
    return;
  }

  if (config.value === "Hex") {
    fromHex(inputValue);
  } else if (config.value === "Dec") {
    fromDec(inputValue);
  } else {
    fromBin(inputValue);
  }
});

reset.addEventListener("click", () => {
  decOutput.value = "";
  binOutput.value = "";
  hexOutput.value = "";
  inputField.value = "";
});

let decOutput = document.getElementById("decOutput");
let hexOutput = document.getElementById("hexOutput");
let binOutput = document.getElementById("binOutput");

function fromHex() {
  let hexValue = inputField.value;
  // Check if the input is a valid hex string
  if (/^[0-9A-Fa-f]+$/.test(hexValue)) {
    hexOutput.value = "0x" + hexValue;
    decOutput.value = parseInt(hexValue, 16);
    binOutput.value = hex2Bin(hexValue);
  } else {
    // Handle invalid input (e.g., display an error message)
    alert("Invalid hex input.");
  }
}

function fromDec() {
  let decValue = Number(inputField.value);
  if(/^-?\d*\.?\d+$/.test(decValue)) {
    decOutput.value = decValue;
    hexOutput.value =  "0x" + decValue.toString(16).toUpperCase();
    binOutput.value = dec2Bin(decValue);
  } else {
    alert("Invalid decimal input.")
  }
}

function fromBin() {
  let binValue = inputField.value;
  if(/^[01]+$/.test(binValue)) {
    binOutput.value = binValue;
    bin2dec2hex(binValue);
  } else {
    alert("Input is not valid binary.");
  }
}

function hex2Bin(hex) {
  let decimal = parseInt(hex, 16);
  let binary = decimal.toString(2);

  if (decimal < 0) {
    let bitLength = binary.length;
    let mask = (1 << bitLength) - 1;

    binary = (decimal & mask).toString(2).padStart(bitLength, '0');
  }
  return binary;
}

function dec2Bin(dec) {
  let binary = dec.toString(2);
  if (dec < 0) {
    let bitLength = binary.length;
    let mask = (1 << bitLength) - 1;

    binary = (dec & mask).toString(2).padStart(bitLength, '0');
  }
  return binary;
}

function bin2dec2hex(binaryInput) {

  const isNegative = binaryInput[0] === '1';

  let complement = binaryInput;
  if (isNegative) {
    complement = binaryInput.split('').map(bit => (bit === '0' ? '1' : '0')).join('');

    let carry = 1;
    for (let i = complement.length - 1; i >= 0; i--) {
      const bitSum = parseInt(complement[i]) + carry;
      complement = complement.substr(0, i) + (bitSum % 2) + complement.substr(i + 1);
      carry = Math.floor(bitSum / 2);
    }
  }

  let decimal = isNegative ? -parseInt(complement, 2) : parseInt(complement, 2);
  decOutput.value = decimal;

  let hex = decimal.toString(16).toUpperCase();
  hexOutput.value = "0x" + hex;
}
