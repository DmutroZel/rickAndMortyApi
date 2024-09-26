let currentPage = 1;

getPage(currentPage);

let currentPageEpisodes = 1;

displayAllEpisodes(currentPageEpisodes);

$('#next').click(() => {
    if (currentPage < 42) {
        currentPage++;
        getPage(currentPage);
        $('.currentPage').text(currentPage);
    }

});


$('#prev').click(() => {
    if (currentPage > 1) {
        currentPage--;
        getPage(currentPage);
        $('.currentPage').text(currentPage);
    }
});



$('.characterContainer').on('click', '.btn', function(e) {
    let id = $(this).attr('id');

    axios.get(`https://rickandmortyapi.com/api/character/${id}`)
        .then(res => {
            let data = res.data;
            console.log(data);


            $('.popup').empty();
            $('.popup').append(`<div class="popupItem">
                <img src="${data.image}" alt="${data.name}">
                <h3>${data.name}</h3>
                <p>${data.species}</p>
                <p>${data.status}</p>
                </div>`)

        })


});

function getPage(page) {
    axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`)
        .then(res => {
            let allCharacters = res.data.results;

            $('.characterContainer').empty();
            for (let el of allCharacters) {
                $('.characterContainer').append(`<div class="characterItem">
                
                <img src="${el.image}" alt="${el.name}">
                <h3>${el.name}</h3>
                <p>${el.species}</p>

                <button class="btn" id="${el.id}">View</button>
                </div>`);
            }
        })
}


$('.characterContainer').on('click', '.btn', function(e) {
    $('.popup').css('display', 'flex');
    $('.popup').css('left', '-100%');
    $('.popup').animate({
        left: '50%',
    }, 1000, function() {
        $('.popup').css('top', '50%');
    });
});


$('.popup').click(function() {
    $('.popup').animate({
        left: '-100%',
    }, 1000, function() {
        $('.popup').css('display', 'none');
    });
});





function displayAllEpisodes(currentPageEpisodes) {
    axios.get(`https://rickandmortyapi.com/api/episode/?page=${currentPageEpisodes}`)
        .then(res => {
            let allEpisodes = res.data.results;
            $('.episodeContainer').empty();
            for (let el of allEpisodes) {
                $('.episodeContainer').append(`<div class="episodeItem">
                    <h3>Episode:${el.episode}</h3>
                    <h4>Name:${el.name}</h4>
                    <p>Air date:${el.air_date}</p>
                    </div>`);
            }
        });
}

displayAllEpisodes(1);

$('#next2').click(() => {
    if (currentPageEpisodes < 3) {
        currentPageEpisodes++;
        displayAllEpisodes(currentPageEpisodes);
        $('.currentPageEpisodes').text(currentPageEpisodes);
    }

});


$('#prev2').click(() => {
    if (currentPageEpisodes > 1) {
        currentPageEpisodes--;
        displayAllEpisodes(currentPageEpisodes);
        $('.currentPageEpisodes').text(currentPageEpisodes);
    }
})
