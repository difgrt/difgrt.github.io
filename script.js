var jtbc, sbs, kbs;
var i = 0;
var activePlayer = null;
var activeWrp = null;
var listener = new window.keypress.Listener();

function createPlayer(bcID, vID) {
    var p = new YT.Player(bcID, {
        height: '100%',
        width: '100%',
        videoId: vID,
        events: {
            'onReady': onPlayerReady
        }
    });
    return p;
}

function onPlayerReady(e) {
    e.target.mute();
    e.target.playVideo();
    i++;
    if ( i == 3 ) {
        jtbc.unMute();
        $('#jtbc_wrp').addClass('active');
        activePlayer = jtbc;
        activeWrp = $('#jtbc_wrp');
        listener.simple_combo('1', activePlayerFn(jtbc, $('#jtbc_wrp')));
        listener.simple_combo('2', activePlayerFn(sbs, $('#sbs_wrp')));
        listener.simple_combo('3', activePlayerFn(kbs, $('#kbs_wrp')));
        listener.simple_combo('m', function() {
          if (activePlayer.isMuted() == false)
            activePlayer.mute();
          else
            activePlayer.unMute();
        });
    }
}

function activePlayerFn(target, targetDiv) {
    return function() {
        activePlayer.mute();
        activeWrp.removeClass('active')
        target.unMute();
        targetDiv.addClass('active');
        activePlayer = target;
        activeWrp = targetDiv;
    }
}

function onYouTubeIframeAPIReady() {
    jtbc = createPlayer('jtbc', 'GpUD0yWA6ZQ');
    sbs = createPlayer('sbs', 'lo7tgFI8Q9I');
    kbs = createPlayer('kbs', 'mHR_bM2BWqQ');
}
