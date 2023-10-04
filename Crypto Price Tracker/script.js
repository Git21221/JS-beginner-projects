const cryptoList = document.getElementById("cryptoList");
let previousPrices = {}; 

async function fetchCryptoData() 
{
    try 
    {
        const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1");
        const cryptoData = await response.json();

        cryptoList.innerHTML = "";

        cryptoData.forEach((crypto) => 
        {
            const cryptoRow = document.createElement("tr");

            const cryptoNameCell = document.createElement("td");
            cryptoNameCell.textContent = crypto.name;
            cryptoNameCell.classList.add("crypto-name"); 

            const cryptoPriceCell = document.createElement("td");
            const currentPrice = parseFloat(crypto.current_price);
            const previousPrice = previousPrices[crypto.id] || currentPrice;

            cryptoPriceCell.textContent = `$${currentPrice.toFixed(2)}`;
            cryptoPriceCell.classList.add(getPriceChangeClass(currentPrice, previousPrice)); // Apply the appropriate class

            cryptoRow.appendChild(cryptoNameCell);
            cryptoRow.appendChild(cryptoPriceCell);

            cryptoList.appendChild(cryptoRow);

            previousPrices[crypto.id] = currentPrice;
        });
    } 
    catch (error) 
    {
        console.error("Error fetching cryptocurrency data:", error);
    }
}

function getPriceChangeClass(currentPrice, previousPrice) 
{
    if (currentPrice > previousPrice) return "price-increase"; 
    else return "price-decrease";
}

fetchCryptoData();

setInterval(fetchCryptoData, 30000);