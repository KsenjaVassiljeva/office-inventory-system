async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
    document.getElementById("output").textContent = "Logged in!";
  } else {
    document.getElementById("output").textContent = JSON.stringify(data);
  }
}


async function loadUsers() {
  const token = localStorage.getItem("token");

  const res = await fetch("/api/users", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await res.json();

  document.getElementById("output").textContent =
    JSON.stringify(data, null, 2);
}