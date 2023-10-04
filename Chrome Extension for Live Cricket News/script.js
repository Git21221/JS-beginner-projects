async function getData() {
    return await fetch("https://api.cricapi.com/v1/currentMatches?[APIKEY]")
        .then(data => data.json())
        .then(data => {
            if (data.status != "success")
                return;

            const dataList = data.data

            if (!dataList)
                return [];

            const releventData = dataList.map(match => `${match.name},${match.status}`);

            console.log({ releventData });
            document.getElementById("matches").innerHTML = releventData.map(match => `<li>${match}</li>`).join('');

            return releventData;
        })

        .catch(e=>console.log(e));
}

getData();