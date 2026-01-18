const fs = require("fs");

const rawText = `
10 oz. Banza chickpea pasta shells
▢1 1/2 lbs. boneless skinless chicken breasts, cubed
▢1/2 Tbsp. Italian seasoning
▢1 tsp. salt
▢fresh cracked pepper
▢1 Tbsp. oil from sun-dried tomatoes
▢2 cups low-fat cottage cheese
▢3/4 cup low-sodium chicken broth
▢1 tsp. garlic powder
▢1 Tbsp. oil from sun-dried tomatoes
▢1/2 cup parmesan cheese, shredded 56g
▢1/2 cup sun-dried tomatoes 85g
▢1 tsp. Italian seasoning
▢1/2 tsp. salt
▢fresh cracked pepper
▢1 1/2 cups spinach, packed
▢basil for garnish
`;

// Split into lines
const ingredients = rawText.split("\n");

// Clean up: remove prices and bullets
const cleanedIngredients = ingredients
  .map(item =>
    item
      .replace(/^▢/, "")                     // remove bullet
      .replace(/\s*\(\$\d+(\.\d{2})?\)/, "") // remove price
      .trim()
  )
  .filter(item => item.length > 0); // remove empty lines

// Add spacing before "titles"
const spacedIngredients = [];
cleanedIngredients.forEach((line, idx) => {
  if (!line.startsWith("0") && !line.match(/^\d/) && !line.startsWith("pinch") && !line.startsWith("fresh")) {
    // Likely a title (not starting with numbers or small words like pinch/fresh)
    if (idx > 0) spacedIngredients.push(""); // add a blank line before
  }
  spacedIngredients.push(line);
});

// Join back into string
const outputText = spacedIngredients.join("\n");

// Save to text file
fs.writeFileSync("cleaned_ingredients.txt", outputText, "utf8");

console.log("Cleaned ingredient list saved to cleaned_ingredients.txt");
