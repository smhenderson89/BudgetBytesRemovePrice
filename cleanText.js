// Function to clean recipe text - browser compatible
function cleanRecipeText(rawText) {
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
    return spacedIngredients.join("\n");
}

console.log("Cleaned ingredient list saved to cleaned_ingredients.txt");
