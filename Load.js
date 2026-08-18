const textElement = document.getElementById("animated-text");
            const phrases = ["SFUNDO MNYANDU"];
            let phraseIdx = 0, charIdx = 0, isDeleting = false;
            function type() {
                const current = phrases[phraseIdx];

                textElement.textContent = current.substring(0, charIdx++);

                if (charIdx <= current.length) {
                    setTimeout(type, 120);
                }
            }
            type();
            const modal = document.getElementById("project-modal"), frame = document.getElementById("project-frame");
            document.querySelectorAll(".projected").forEach(card => {
                card.onclick = () => { frame.src = card.getAttribute("data-url"); modal.style.display = "block"; };
            });
            document.querySelector(".close-modal").onclick = () => { modal.style.display = "none"; frame.src = ""; };
            window.onclick = (e) => { if (e.target == modal) { modal.style.display = "none"; frame.src = ""; } };
        