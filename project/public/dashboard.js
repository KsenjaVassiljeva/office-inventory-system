const token = localStorage.getItem("token");

// если нет токена → обратно на login
if (!token) {
  window.location.href = "/login.html";
}

// загрузка пользователей
async function loadUsers() {
  const res = await fetch("/api/users", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const users = await res.json();

  const list = document.getElementById("users");
  list.innerHTML = "";

  users.forEach(user => {
    const li = document.createElement("li");
    li.textContent = user.email;
    list.appendChild(li);
  });
}

loadUsers();


// Stripe donate
function donate() {
  window.location.href = "https://buy.stripe.com/test_6oU8wH3377dOedA4dp7g401";
}


// logout
function logout() {
  localStorage.removeItem("token");
  window.location.href = "/login.html";
}