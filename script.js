document.getElementById('foodForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const foodName = document.getElementById('foodName').value;
    const foodAmount = parseInt(document.getElementById('foodAmount').value);

    // Nutritionix API'sini kullanarak kalori bilgisini al
    const apiId = '2331d15f'; // API ID'nizi buraya girin
    const apiKey = '94c1567487dc2656936920bdaa3000af'; // API Key'inizi buraya girin
    const apiUrl = `https://api.nutritionix.com/v1_1/search/${foodName}?results=0:1&fields=item_name,nf_calories&appId=${apiId}&appKey=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.hits && data.hits.length > 0) {
            const caloriesPer100g = data.hits[0].fields.nf_calories;
            const calories = (caloriesPer100g * foodAmount) / 100;

            const foodList = document.getElementById('foodList');
            const totalCaloriesElement = document.getElementById('totalCalories');

            const listItem = document.createElement('li');
            listItem.textContent = `${foodName} - ${foodAmount}g: ${calories.toFixed(2)} kcal`;
            foodList.appendChild(listItem);

            const totalCalories = parseFloat(totalCaloriesElement.textContent) + calories;
            totalCaloriesElement.textContent = totalCalories.toFixed(2);
        } else {
            alert('Yiyecek bulunamadı!');
        }
    } catch (error) {
        console.error('API hatası:', error);
        alert('API bağlantısı sırasında bir hata oluştu.');
    }

    // Formu temizle
    document.getElementById('foodForm').reset();
});
