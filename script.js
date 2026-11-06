const memberCards = document.querySelectorAll(".member-card[data-sound]");

async function playMemberSound(card) {
  const sound = document.getElementById(card.dataset.sound);
  const audio = sound?.querySelector("audio");
  const status = card.querySelector(".member-play-status");

  if (!(audio instanceof HTMLAudioElement) || !status) {
    status.textContent = "找不到這位成員的音效播放器。";
    return;
  }

  document.querySelectorAll(".sound-choice audio").forEach((otherAudio) => {
    if (otherAudio !== audio) {
      otherAudio.pause();
    }
  });

  audio.currentTime = 0;

  try {
    await audio.play();
    status.textContent = `正在播放：${sound.querySelector("h3")?.textContent ?? "成員音效"}`;
  } catch {
    status.textContent = "音效播放失敗，請檢查網路後再試。";
  }
}

memberCards.forEach((card) => {
  card.addEventListener("click", () => {
    playMemberSound(card);
  });

  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      playMemberSound(card);
    }
  });
});
