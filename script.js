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

function setupQrCode() {
  const currentUrl = window.location.href;
  const isHosted = window.location.protocol.startsWith("http");

  if (!isHosted) {
    qrText.textContent = "本地预览中。部署到 GitHub Pages 后，这里会显示可扫码访问的二维码。";
    return;
  }

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=440x440&margin=16&data=${encodeURIComponent(currentUrl)}`;
  qrImage.src = qrUrl;
  qrText.textContent = `扫码即可在手机打开当前页面：${window.location.host}`;
}

setupQrCode();
