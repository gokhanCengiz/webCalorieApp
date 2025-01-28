async function getCalories(foodName) {
    const apiKey = '94c1567487dc2656936920bdaa3000af';
    const appId = '2331d15f';
    const url = `https://api.nutritionix.com/v1_1/search/${foodName}?results=0:1&fields=item_name,nf_calories&appId=${appId}&appKey=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();
    return data.hits[0].fields.nf_calories;
}

document.getElementById('foodForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const foodName = document.getElementById('foodName').value;
    const foodAmount = parseInt(document.getElementById('foodAmount').value);

    const caloriesPer100g = await getCalories(foodName);
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
