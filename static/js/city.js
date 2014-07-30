$(document).ready(function(){
    var start = new Date;

    var seconds = 0;
    var money = 20;

    var buildings = 0;
    var hospitals = 0;
    var population = 1;
    var population_max = 0;
    var population_per_building = 20;
    var money_rate = 0;

    function update_time(seconds) {
        $('.timer .value').text(parseInt(seconds));
    }

    function update_money(money_rate) {
        $('.money .value').text(parseInt(money) + ' / +' + parseInt(money_rate));
    }

    function update_buildings(buildings, hospitals) {
        $('.buildings .value').text(buildings);
        $('.hospitals .value').text(hospitals);
    }

    function update_population(population) {
        $('.population .value').text(parseInt(population) + ' / ' + population_max);
    }

    function notification(message) {
        $('.notification').text(message);
        $('.notification').fadeIn();

        setTimeout(function() {
            $('.notification').fadeOut();
        }, 2000 );
    }

    function build(building, price) {
        if (money >= price) {
            money -= price;
            update_money();
            update_buildings();
            var size = $.randomBetween(30, 60);
            $('.ground').append('<i class="icon-'+ building +'" style="font-size: '+ size +'px"></i>');
        } else {
            notification('Not enough resources. Need: ' + price);
        }
    }

    function log(log)
    {
        console.log(log);
    }

    setInterval(function() {
        money_rate = 5 + (population / 10);

        seconds = (new Date - start) / 1000;
        money += money_rate;
        buildings = $(".ground .icon-building").length;
        hospitals = $(".ground .icon-hospital").length;
        population_max = buildings * population_per_building;

        if (population < population_max) {
            population += (population * 0.01) + (buildings * 0.01) + (hospitals * 0.1) + (money * 0.01);

            if (population > population_max) {
                population = population_max;
            }
        }

        log('pop: ' + population);

        update_buildings(buildings, hospitals);
        update_money(money_rate);
        update_time(seconds);
        update_population(population, population_max);

    }, 1000);

    $('.new-building').click(function() {
        var building = $(this).attr('building');
        var price = $(this).attr('price');
        build(building, price);
    });

});