document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    items.forEach((item) => observer.observe(item));
  } else {
    items.forEach((item) => item.classList.add("visible"));
  }
  const copyButton = document.getElementById("copy-bibtex");
  const bibtex = document.getElementById("bibtex-code");
  if (copyButton && bibtex) {
    copyButton.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(bibtex.textContent);
        copyButton.querySelector("span").textContent = "Copied";
        setTimeout(() => { copyButton.querySelector("span").textContent = "Copy"; }, 1800);
      } catch {
        const range = document.createRange();
        range.selectNodeContents(bibtex);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
      }
    });
  }
});
