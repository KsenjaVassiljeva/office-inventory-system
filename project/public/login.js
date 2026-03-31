document.getElementById("login-btn").addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMsg = document.getElementById("error-msg");

    errorMsg.style.display = "none";

    if (!email || !password) {
        errorMsg.textContent = "Palun täida kõik väljad";
        errorMsg.style.display = "block";
        return;
    }

    try {
        const res = await fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (!res.ok) {
            errorMsg.textContent = data.error || "Sisselogimine ebaõnnestus";
            errorMsg.style.display = "block";
            return;
        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "/index.html";

    } catch (err) {
        errorMsg.textContent = "Serveri viga, proovi uuesti";
        errorMsg.style.display = "block";
    }
});