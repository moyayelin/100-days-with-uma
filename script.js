const audios = [...document.querySelectorAll("audio")];
const audioButtons = [...document.querySelectorAll(".audio-toggle")];
const revealNodes = [...document.querySelectorAll(".reveal")];
const qrImage = document.querySelector("#qr-image");
const qrText = document.querySelector("#qr-text");

function syncButtonState(audio, isPlaying) {
  const button = document.querySelector(`[data-audio="${audio.id}"]`);
  if (!button) return;

  button.textContent = isPlaying ? "暂停" : "播放";
  button.classList.toggle("is-playing", isPlaying);
}

audioButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const audio = document.getElementById(button.dataset.audio);
    if (!audio) return;

    if (audio.paused) {
      audios.forEach((item) => {
        if (item !== audio) {
          item.pause();
          syncButtonState(item, false);
        }
      });

      audio.play();
      syncButtonState(audio, true);
      return;
    }

    audio.pause();
    syncButtonState(audio, false);
  });
});

audios.forEach((audio) => {
  audio.addEventListener("play", () => {
    audios.forEach((item) => {
      if (item !== audio) {
        item.pause();
        syncButtonState(item, false);
      }
    });
    syncButtonState(audio, true);
  });

  audio.addEventListener("pause", () => syncButtonState(audio, false));
  audio.addEventListener("ended", () => syncButtonState(audio, false));
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  }
);

revealNodes.forEach((node) => observer.observe(node));
