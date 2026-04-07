const loginBtn = document.getElementById("login-btn");
const errorMsg = document.getElementById("error-msg");

loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  errorMsg.style.display = "none";

  if (!email || !password) {
    showError("Email ja parool on kohustuslikud");
    return;
  }

  try {
    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Login failed");
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));


    window.location.href = "/dashboard.html";

  } catch (err) {
    showError(err.message);
  }
});

function showError(message) {
  errorMsg.textContent = message;
  errorMsg.style.display = "block";
}