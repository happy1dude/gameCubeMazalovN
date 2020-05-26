const numDivs = 36;
const maxHits = 10;

let hits = 0;
let fails = 0; 
let firstHitTime = 0;

function round() {
  // FIXME: надо бы убрать "target" прежде чем искать новый
  $(".col").removeClass("target");
  $(".col").removeClass("miss");

  let divSelector = randomDivId();
  $(divSelector).addClass("target");

  // TODO: помечать target текущим номером
  $(divSelector).text(hits + 1);
  
  // FIXME: тут надо определять при первом клике firstHitTime
  if (hits === 1 ) {
    firstHitTime = getTimestamp();
  }

  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  // FIXME: спрятать игровое поле сначала
  $('.game-field').hide("slow");

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#total-score").text(hits - fails);
   let totalOne = hits - fails;
     if ( totalOne >= 8 ) {
      $("#score-message").text("Молодец, вы меткий малый!");
    } else if ( totalOne >= 4 ) {
        $("#score-message").text("По таким большим ячейкам и не попасть...");
      } else {
        $("#score-message").text("Всего лишь " + totalOne + "? " + "Видимо вы слепой или криворучка :)");
      }
  
  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  // FIXME: убирать текст со старых таргетов. Кажется есть .text?
  let target = $(event.target);
  target.text('');
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    round();
  } else {
    fails += 1;
    $(event.target).addClass('miss');
  }
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
  
}

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  $("#button-start").click(function() {
    $(".col").show("slow");
  });
  round();

  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);
