// Получаем все кнопки "Kasuta" и "Kustuta"
const useButtons = document.querySelectorAll('.use');
const deleteButtons = document.querySelectorAll('.delete');

// Анимация для кнопки "Kasuta"
useButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.style.transition = '0.3s';
        button.style.transform = 'scale(1.2)';
        button.style.backgroundColor = '#27ae60';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
            button.style.backgroundColor = '#2ecc71';
        }, 300);
    });
});

// Анимация для кнопки "Kustuta" (удаляет строку плавно)
deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
        const row = button.closest('tr');
        row.style.transition = 'all 0.5s ease';
        row.style.opacity = '0';
        row.style.transform = 'translateX(100%)';
        setTimeout(() => {
            row.remove();
        }, 500);
    });
});

// Анимация для кнопок формы логина/регистрации
const formButtons = document.querySelectorAll('.login button');
formButtons.forEach(btn => {
    btn.addEventListener('mouseover', () => {
        btn.style.transition = '0.2s';
        btn.style.transform = 'scale(1.05)';
    });
    btn.addEventListener('mouseout', () => {
        btn.style.transform = 'scale(1)';
    });
});