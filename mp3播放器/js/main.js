(function() {
  var audioElemet = document.createElement("audio");
  var timeLen = $(".player_timeLineBar").get(0).offsetWidth;
  var TM = new TimelineMax(); //创建动画实例
  //设置动画属性
  TM.to(
    ".player_cdData",
    3,
    {
      rotation: "360deg",
      ease: Power0.easeNone, //动画曲线缓冲
      repeat: -1 //无限重复
    },
    "-=0.2s"
  ); //提前0.2s进入动画重复

  //停止
  TM.pause();

  //获取dom上的歌曲和歌手
  function changeSoneLrc() {
    $(".songName").text($(".active_song").attr("data-song"));
    $(".auctor").text($(".active_song").attr("data-auctor"));
  }

  //点击播放
  $(".player_play").on("click", function() {
    if ($(".player").hasClass("play")) {
      //判断player上是否有play
      $(".player").removeClass("play"); //移除play

      //CD尺寸还原动画
      TweenMax.to(".player_cdData", 0.2, {
        scale: 1,
        ease: Power0.easeNone
      });

      //让背板下降动画
      TweenMax.to(".back_Mask", 0.2, {
        top: 0,
        ease: Power0.easeNone
      });

      TM.pause(); //停止旋转
      audioElemet.pause(); //暂停播放
    } else {
      $(".player").addClass("play"); //添加play

      //让CD变大
      TweenMax.to(".player_cdData", 0.2, {
        scale: 1.1,
        ease: Power0.easeNone
      });

      //背板上升
      TweenMax.to(".back_Mask", 0.2, {
        top: "-50%",
        ease: Power0.easeNone
      });

      TM.play(); //CD旋转
      audioElemetPlay(); //播放
      changeSoneLrc();
      durationLine(); //进度条开始
    }
  });

  //播放音乐
  function audioElemetPlay() {
    if ($(".player").hasClass("play")) {
      audioElemet.setAttribute("src", $(".active_song").attr("data-origin"));
      audioElemet.play();
    }
  }

  //上一曲
  $(".player_prev").on("click", function() {
    if ($(".player .player_cdData.active_song").is(":first-child")) {
      //判断当前播放是否是第一个
      $(".player .player_cdData.active_song").removeClass("active_song");
      $(".player .player_cdData:last-child").addClass("active_song");
    } else {
      $(".player .player_cdData.active_song")
        .removeClass("active_song")
        .prev()
        .addClass("active_song");
    }
    audioElemetPlay();
    changeSoneLrc();
    durationLine();
  });

  //下一曲
  $(".player_next").click(function() {
    if ($(".player .player_cdData.active_song").is(":last-child")) {
      //判断cd播放是否是最后一个
      $(".player .player_cdData.active_song").removeClass("active_song");
      $(".player .player_cdData:first-child").addClass("active_song");
    } else {
      $(".player .player_cdData.active_song")
        .removeClass("active_song")
        .next()
        .addClass("active_song");
    }
    audioElemetPlay();
    changeSoneLrc();
    durationLine();
  });

  //进度条
  function durationLine() {
    audioElemet.addEventListener("timeupdate", function() {
      var duration = this.duration; //整首歌的长度  S为单位
      var currTime = this.currentTime; //当前时间  S为单位
      var percent = currTime / duration; //当前播放比例

      $(".player_duration").css({
        width: parseInt(percent * timeLen) + "px"
      });
    });
  }
})();
