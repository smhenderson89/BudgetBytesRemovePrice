const fs = require("fs");

const rawText = `
Cinnamon Roasted Sweet Potatoes
▢5 sweet potatoes (about 3/4 lb. each) ($1.49)
▢2.5 Tbsp cooking oil ($0.04)
▢1.25 tsp cinnamon ($0.05)
▢pinch cayenne pepper ($0.02)
▢pinch salt ($0.02)
Smoky Chicken
▢2.5 tsp smoked paprika ($0.10)
▢2.5 tsp brown sugar ($0.02)
▢0.63 tsp garlic powder ($0.02)
▢0.31 tsp cayenne pepper ($0.02)
▢0.63 tsp salt ($0.02)
▢freshly ground pepper ($0.02)
▢5 boneless, skinless chicken breasts (about 2/3 lb. each) ($6.42)
▢2.5 Tbsp cooking oil ($0.04)
Green Beans
▢2.5 lb. green beans ($0.99)
▢2.5 Tbsp butter ($0.12)
▢pinch salt and pepper ($0.04)
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
