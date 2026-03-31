document.getElementById("register-btn").addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;
    const errorMsg = document.getElementById("error-msg");
 
    errorMsg.style.display = "none";
 
    if (!email || !password || !passwordConfirm) {
        errorMsg.textContent = "Palun täida kõik väljad";
        errorMsg.style.display = "block";
        return;
    }
 
    if (password !== passwordConfirm) {
        errorMsg.textContent = "Paroolid ei kattu";
        errorMsg.style.display = "block";
        return;
    }
 
    try {
        const res = await fetch("/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, passwordConfirm })
        });
 
        const data = await res.json();
 
        if (!res.ok) {
            errorMsg.textContent = data.error || "Registreerimine ebaõnnestus";
            errorMsg.style.display = "block";
            return;
        }
 
        // Registration successful — redirect to login
        window.location.href = "/login.html";
 
    } catch (err) {
        errorMsg.textContent = "Serveri viga, proovi uuesti";
        errorMsg.style.display = "block";
    }
});