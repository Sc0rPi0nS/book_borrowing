function openPopup() {
    document.getElementById('popupForm').style.display = 'flex';
}

function closePopup() {
    document.getElementById('popupForm').style.display = 'none';
}

function submitForm() {
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;

    if (fullName && email) {
        fetch('/reserve', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fullName, email }),
        })
        .then(response => response.json())
        .then(data => {
            alert('การจองสำเร็จ!\nชื่อ: ' + fullName + '\nอีเมล: ' + email);
            closePopup();
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('เกิดข้อผิดพลาดในการจอง');
        });
    } else {
        alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    }
}
