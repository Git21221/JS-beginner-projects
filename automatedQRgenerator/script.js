const wrap = document.querySelector(".wrap");
const generateBtn = wrap.querySelector(".form button");
const qrInput = wrap.querySelector(".form input");
const qrImg = wrap.querySelector(".qr-code img");

generateBtn.addEventListener("click", () => {
  let qrValue = qrInput.value;
  generateBtn.innerHTML = "Generating QR code.....";
  if (!qrValue) return;
  // console.log(qrValue);
  qrImg.src = ` https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrValue}`;
  qrImg.addEventListener("load", () => {
    wrap.classList.add("active");
    generateBtn.innerText = "Generating QR code";
  });
});

qrInput.addEventListener("keyup", () => {
  if (!qrInput.value) {
    wrap.classList.remove("active");
  }
});
