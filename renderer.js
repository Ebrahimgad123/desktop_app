console.log("Application started");

let currentIndex = 0; // مؤشر الذكر الحالي
let azkar = []; // قائمة الأذكار

async function render() {
    const container = document.getElementById("container");
    container.innerHTML = ""; // تفريغ المحتوى السابق

    // جلب الأذكار من ملف JSON
    const response = await fetch('azkar.json');
    azkar = await response.json();
      
    displayCurrentZikr();
}

function displayCurrentZikr() {
    const container = document.getElementById("container");
    // container.innerHTML = ""; // تفريغ المحتوى السابق

    if (currentIndex < azkar.length) {
        const currentZikr = azkar[currentIndex];
        const div = document.createElement("div");
        div.className = "azkar-item";
        div.innerHTML = `
            <p><strong>الذكر:</strong> ${currentZikr.text}</p>
            <p><strong>التكرار:</strong> ${currentZikr.repeat} مرة</p>
            <button onclick="nextZikr()">التالي</button>
        `;
        container.appendChild(div);
    } else {
        container.innerHTML = "<p>لقد أكملت جميع الأذكار! جزاك الله خيرًا.</p>";
    }
}

function nextZikr() {
    currentIndex++;
    const remaining = azkar.length - currentIndex;
    if (remaining > 0) {
        const nextZikr = azkar[currentIndex];
        const audio = new Audio(nextZikr.audio);
        audio.play();
    } else {
        alert("لقد أكملت جميع الأذكار! جزاك الله خيرًا.");
    }
    displayCurrentZikr();
}