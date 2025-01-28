document.getElementById('foodForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const foodName = document.getElementById('foodName').value;
    const foodAmount = parseInt(document.getElementById('foodAmount').value);

    // Burada API'yi kullanarak yiyeceğin kalorisini alabilirsiniz.
    // Örnek olarak sabit bir kalori değeri kullanıyoruz.
    const caloriesPer100g = 100; // Bu değeri API'den almalısınız.
    const calories = (caloriesPer100g * foodAmount) / 100;

    const foodList = document.getElementById('foodList');
    const totalCaloriesElement = document.getElementById('totalCalories');

    const listItem = document.createElement('li');
    listItem.textContent = `${foodName} - ${foodAmount}g: ${calories.toFixed(2)} kcal`;
    foodList.appendChild(listItem);

    const totalCalories = parseFloat(totalCaloriesElement.textContent) + calories;
    totalCaloriesElement.textContent = totalCalories.toFixed(2);

    // Formu temizle
    document.getElementById('foodForm').reset();
});
