const API = 'https://youtube-v31.p.rapidapi.com/playlistItems?playlistId=playlist%3Flist%3DPLujU8zZv6E0wtdA3q3QURvqZabYw_y6Uc&part=snippet&maxResults=6';

const content = null || document.getElementById('content');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '9bdf47239cmsh1aa1fd3dde307b0p1b7977jsn7aed47b38c4d',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};


async function fetchData(urlApi) {
    const response = await fetch(urlApi, options);
    const result = await response.json();
    return result;
}

(async () => {
    try {
        const videos = await fetchData(API);

        // Generamos un template que nos va a permitir iterar por cada uno de los elementos y en el template string pegar el codigo HTML del content
        let view = `
            ${videos.items.map((video) => `
            <div class="group relative">
                <div
                    class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                    <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
                </div>
                <div class="mt-4 flex justify-between">
                    <h3 class="text-sm text-gray-700">
                        <span aria-hidden="true" class="absolute inset-0"></span>
                        ${video.snippet.title}
                    </h3>
                </div>
            </div>
            `).slice(0,4).join('')}
        `;
        content.innerHTML = view;
    } catch (error) {
        console.error(error);
    }
}) ();
