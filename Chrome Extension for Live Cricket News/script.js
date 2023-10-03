async function getData() {
    return await fetch("https://api.cricapi.com/v1/currentMatches?apikey=8742ca71-a233-4531-8624-b64aa82f877b&offset=0")
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