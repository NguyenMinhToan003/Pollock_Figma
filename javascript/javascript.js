window.addEventListener("load", function () {
  emailInput();
  clickImage();
});
function emailInput() {
  const input = document.querySelector(".footer-email");
  const button = document.querySelector(".footer-button");
  let value;
  const regex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  input.addEventListener("input", (e) => {
    console.log(e.target.value);
    value = e.target.value;
    if (!regex.test(value)) {
      input.classList.add("unactive");
      input.classList.remove("active");
    } else {
      input.classList.remove("unactive");
      input.classList.add("active");
    }
    if (!value) {
      input.classList.remove("unactive");
      input.classList.remove("active");
    }
  });
  button.addEventListener("click", (e) => {
    e.preventDefault();
    if (!value) return;
    const temp = `<div class="alert-email"> 
    <h3 class="alert-email-title"> </h3>
    <p class="alert-email-input ">
    </p>
  </div>`;
    document.body.insertAdjacentHTML("afterbegin", temp);
    const alert = document.querySelector(".alert-email");
    const alertTitle = document.querySelector(".alert-email-title");
    const alertText = document.querySelector(".alert-email-input");
    alertText.textContent = value;
    if (regex.test(value)) {
      alertTitle.textContent = `OK!`;
      alert.style.backgroundColor = "#58C27D";
      localStorage.setItem("email", JSON.stringify(value));
    } else {
      alertTitle.textContent = `NO!`;
      alert.style.backgroundColor = "#FF6370";
      localStorage.removeItem("email");
    }
    if (alert)
      setTimeout(function () {
        alert.parentNode.removeChild(alert);
      }, 2000);
  });
}
function clickImage() {
  const imgs = document.querySelectorAll(".work-img ");
  let wrapper;
  [...imgs].forEach((item) =>
    item.addEventListener("click", (e) => {
      const img = e.target.getAttribute("srcSet");
      const temp = `  <div class="image-zoom">
      <div class="image-zoom-wrapper">
        <img class="image" srcSet=${img} alt="" />
      </div>
    </div>`;
      document.body.insertAdjacentHTML("beforeend", temp);
      wrapper = document.querySelector(".image-zoom");
    })
  );
  document.body.addEventListener("click", (e) => {
    if (!e.target.matches(".image") && e.target.matches(".image-zoom")) {
      wrapper.parentNode.removeChild(wrapper);
    }
  });
}
