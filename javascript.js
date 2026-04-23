const coin = document.getElementById("coin");
    const path = document.getElementById("motionPath");

    const pathLength = path.getTotalLength();

    const duration = 6000; // ms for one full trip
    const coinSize = 54;

    // Set to true if you want the coin to keep spinning on its own
    const addSpin = true;
    const spinSpeed = 720; // degrees per full path traversal

    function pointAt(t) {
      return path.getPointAtLength(t * pathLength);
    }

    function angleAt(t) {
      const epsilon = 0.001;
      const p1 = pointAt(Math.max(0, t - epsilon));
      const p2 = pointAt(Math.min(1, t + epsilon));
      return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
    }

    let start = null;

    function animate(timestamp) {
      if (!start) start = timestamp;

      const elapsed = timestamp - start;
      const rawProgress = (elapsed % duration) / duration;

      // Optional easing for a more organic glide
      const t = easeInOutSine(rawProgress);

      const p = pointAt(t);
      const pathAngle = angleAt(t);
      const spinAngle = addSpin ? rawProgress * spinSpeed : 0;
      const finalAngle = pathAngle + spinAngle;

      coin.style.left = `${p.x - coinSize / 2}px`;
      coin.style.top = `${p.y - coinSize / 2}px`;
      coin.style.transform = `rotate(${finalAngle}deg)`;

      requestAnimationFrame(animate);
    }

    function easeInOutSine(x) {
      return -(Math.cos(Math.PI * x) - 1) / 2;
    }

    requestAnimationFrame(animate);
