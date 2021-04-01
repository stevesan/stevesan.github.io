function throb(scene, image, amount) {
  if (amount === undefined) {
    amount = 1.2;
  }
  if (image.__throbbing) return;
  image.__throbbing = true;
  const origScale = image.scale;
  image.setScale(origScale * amount);
  scene.tweens.add({
    targets: image,
    scale: origScale,
    ease: 'Quadratic',
    duration: 200,
    delay: 0,
    repeat: 0,
    onComplete: () => {
      image.__throbbing = false;
    }
  });
}

function toggleOrChange(currVal, goalVal) {
  if (currVal == goalVal) {
    return null;
  }
  else {
    return goalVal;
  }
}
