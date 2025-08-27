const rawText = `
0.38 cup olive oil ($0.52)
0.38 cup lemon juice ($0.16)
4.5 cloves garlic, minced ($0.26)
0.75 Tbsp dried oregano ($0.05)
0.75 tsp salt ($0.02)
Freshly cracked pepper ($0.02)
2.25 lbs. boneless skinless chicken thighs or breasts ($4.94)
`;

// Turn the long string into an array of lines
const ingredients = rawText.split('\n');

// Remove prices
const cleanedIngredients = ingredients.map(item =>
  item.replace(/\s*\(\$\d+(\.\d{2})?\)/, "")
);

// Output result
console.log("Cleaned ingredient list:");
cleanedIngredients.forEach(item => console.log("- " + item));