let programmatic = false;

thumb.onmousedown = function () {
  text.parentElement.style.userSelect = "none";
  document.body.onmousemove = (evt) => {
    const transform = thumb.style.transform || "translateY(0px)";
    let offset = parseInt(transform.slice(11));
    offset = Math.max(offset + evt.movementY, 0);
    const maxOffset = track.scrollHeight - thumb.scrollHeight;
    offset = Math.min(offset, maxOffset);
    const multiplier = offset / maxOffset;
    thumb.style.transform = "translateY(" + offset + "px)";
    programmatic = true;
    text.scrollTo(0, (text.scrollHeight - text.offsetHeight) * multiplier);
    setTimeout(() => {
      programmatic = false;
      text.parentElement.style.userSelect = null;
    }, 50);
  };
  document.body.onmouseup = () => {
    document.body.onmouseup = null;
    document.body.onmousemove = null;
  };
};

text.onscroll = function (evt) {
  if (programmatic) return;
  const multiplier = text.scrollTop / (text.scrollHeight - text.offsetHeight);
  const maxOffset = track.scrollHeight - thumb.scrollHeight;
  let offset = multiplier * maxOffset;
  thumb.style.transform = "translateY(" + offset + "px)";
  // console.log(evt);
};
