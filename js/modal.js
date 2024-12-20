// modal.js
export function setupModals() {
  let modal;

  document
    .getElementById("storyBehindChessGame")
    .addEventListener("click", () => {
      modal = document.getElementById("chessGameModal");
      modal.style.display = "block";
    });

  document
    .getElementById("storyBehindSortingAlgorithm")
    .addEventListener("click", () => {
      modal = document.getElementById("sortingAlgorithmModal");
      modal.style.display = "block";
    });

  document
    .getElementById("storyBehindSocialNetworking")
    .addEventListener("click", () => {
      modal = document.getElementById("socialNetworkModal");
      modal.style.display = "block";
    });

  document
    .getElementById("storyBehindMultiChess")
    .addEventListener("click", () => {
      modal = document.getElementById("mutliplayerChessModal");
      modal.style.display = "block";
    });

  const closeButtons = document.querySelectorAll(".close");
  closeButtons.forEach((closeButton) => {
    closeButton.addEventListener("click", function () {
      document.body.classList.remove("no-scroll");
      modal.style.display = "none";
    });
  });

  document.addEventListener("click", (event) => {
    if (event.target == modal) {
      document.body.classList.remove("no-scroll");
      modal.style.display = "none";
    }
  });
}
