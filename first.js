function voiceSetHeights(b, r, y, g) {
    b = Math.max(b, 10);
    r = Math.max(r, 10);
    y = Math.max(y, 10);
    g = Math.max(g, 10);
    
    var blue = $('.input-pills > .blue');
    var red = $('.input-pills > .red');
    var yellow = $('.input-pills > .yellow');
    var green = $('.input-pills > .green');
    
    blue.css('height', b + 'px');
    blue.css('top', '-' + ((b / 2) - 5) + 'px');
    
    red.css('height', r + 'px');
    red.css('top', '-' + ((r / 2) - 5) + 'px');
    
    yellow.css('height', y + 'px');
    yellow.css('top', '-' + ((y / 2) - 5) + 'px');
    
    green.css('height', g + 'px');
    green.css('top', '-' + ((g / 2) - 5) + 'px');
  }
  
  $("html")
    .parent()
    .ready(() => {
      const chat = $(".chat");
      function scrollToBottom() {
        chat[0].scrollTop = chat[0].scrollHeight;
      }
      scrollToBottom();
  
      if ($(".keyboard-input").css("display") === "block") {
        document.getElementsByClassName("input-text")[0].select();
      }
  
      $(".input-keyboard").on("click", e => {
        $(".keyboard-input").show();
        $(".voice-input").hide();
        document.getElementsByClassName("input-text")[0].select();
      });
  
      $(".input-voice").on("click", e => {
        $(".keyboard-input").hide();
        $(".voice-input").show();
      });
  
      $("body").on("keypress", e => {
        // e.originalEvent.key.match(/[a-z]/i) !== null
        if (
          !e.ctrlKey &&
          !e.altKey &&
          $(".keyboard-input").css("display") === "block" &&
          !$(".input-text").is(":focus")
        ) {
          window.l = e;
          const y = document.getElementsByClassName("input-text")[0];
          y.select();
          y.selectionEnd = y.value.length;
          y.selectionStart = y.value.length;
          $.event.trigger(e);
        }
      });
  
      $(".input-text").on("keyup", e => {
        if (e.which === 13) {
          $(".input-send").trigger("click");
        } else if ($(".input-text").val().trim() === "") {
          $(".keyboard-input > .input-send").hide();
          $(".keyboard-input > .input-voice").show();
        } else {
          $(".keyboard-input > .input-send").show();
          $(".keyboard-input > .input-voice").hide();
        }
      });
  
      $(".input-send").on("click", e => {
        if ($(".input-text").val().trim() !== "") {
          let input = $(".input-text").val().trim();
          $(".input-text").val('');
          console.log(e);
          $('#chat-box').append(`<div class="chat-message from-user">
          <div class="content"><span class="text">${input}</span></div>
        </div>`);
          scrollToBottom();
          $(".keyboard-input > .input-send").hide();
          $(".keyboard-input > .input-voice").show();
        }
      });
    
      voiceSetHeights(10, 10, 10, 10);
    });