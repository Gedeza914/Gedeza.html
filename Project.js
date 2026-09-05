/* ==========================================================================
   GEDEZA PROJECT WEBSITE
   THEME + MODAL JAVASCRIPT
========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ============================================================
       ELEMENTS
    ============================================================ */

    const rootHTML =
        document.documentElement;

    const themeToggleBtn =
        document.getElementById("themeToggle");

    const themeIcon =
        document.getElementById("themeIcon");

    const modal =
        document.getElementById("project-modal");

    const closeModalBtn =
        document.getElementById("closeModalBtn");

    const projectFrame =
        document.getElementById("project-frame");

    const launchButtons =
        document.querySelectorAll(".btn-launch");


    /* ============================================================
       INITIALIZE LUCIDE
    ============================================================ */

    if (window.lucide) {

        lucide.createIcons();

    }


    /* ============================================================
       GET SAVED THEME
       
       If the visitor has already selected a theme,
       remember it.

       Otherwise default to DARK MODE.
    ============================================================ */

    const savedTheme =
        localStorage.getItem("theme") || "dark";


    applyTheme(savedTheme);


    /* ============================================================
       THEME TOGGLE
    ============================================================ */

    if (themeToggleBtn) {

        themeToggleBtn.addEventListener("click", () => {

            const currentTheme =
                rootHTML.classList.contains("light-mode")
                    ? "light"
                    : "dark";


            const newTheme =
                currentTheme === "light"
                    ? "dark"
                    : "light";


            applyTheme(newTheme);

        });

    }


    /* ============================================================
       APPLY THEME
    ============================================================ */

    function applyTheme(theme) {

        if (theme === "light") {

            /* -----------------------------------------
               WHITE MODE
            ------------------------------------------ */

            rootHTML.classList.add("light-mode");

            localStorage.setItem(
                "theme",
                "light"
            );


            /*
               Moon means:
               "Click here to enter Dark Mode"
            */

            updateThemeIcon("moon");

            if (themeToggleBtn) {

                themeToggleBtn.setAttribute(
                    "aria-label",
                    "Switch to dark mode"
                );

                themeToggleBtn.setAttribute(
                    "title",
                    "Switch to dark mode"
                );

            }

        } else {

            /* -----------------------------------------
               DARK MODE
            ------------------------------------------ */

            rootHTML.classList.remove("light-mode");

            localStorage.setItem(
                "theme",
                "dark"
            );


            /*
               Sun means:
               "Click here to enter Light Mode"
            */

            updateThemeIcon("sun");

            if (themeToggleBtn) {

                themeToggleBtn.setAttribute(
                    "aria-label",
                    "Switch to light mode"
                );

                themeToggleBtn.setAttribute(
                    "title",
                    "Switch to light mode"
                );

            }

        }

    }


    /* ============================================================
       UPDATE THEME ICON
    ============================================================ */

    function updateThemeIcon(iconName) {

        if (!themeIcon) {
            return;
        }


        themeIcon.setAttribute(
            "data-lucide",
            iconName
        );


        if (window.lucide) {

            lucide.createIcons();

        }

    }


    /* ============================================================
       PROJECT LAUNCH BUTTONS
    ============================================================ */

    launchButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const url =
                button.getAttribute("data-url");


            if (url) {

                openModal(url);

            }

        });

    });


    /* ============================================================
       CLOSE MODAL BUTTON
    ============================================================ */

    if (closeModalBtn) {

        closeModalBtn.addEventListener(
            "click",
            closeModal
        );

    }


    /* ============================================================
       CLOSE MODAL WHEN CLICKING OUTSIDE
    ============================================================ */

    if (modal) {

        modal.addEventListener("click", (event) => {

            if (event.target === modal) {

                closeModal();

            }

        });

    }


    /* ============================================================
       ESCAPE KEY
    ============================================================ */

    window.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            closeModal();

        }

    });

});


/* ==========================================================================
   OPEN PROJECT MODAL
========================================================================== */

function openModal(url) {

    const modal =
        document.getElementById("project-modal");

    const iframe =
        document.getElementById("project-frame");


    if (!modal || !iframe) {
        return;
    }


    iframe.src = url;


    modal.classList.add("active");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";

}


/* ==========================================================================
   CLOSE PROJECT MODAL
========================================================================== */

function closeModal() {

    const modal =
        document.getElementById("project-modal");

    const iframe =
        document.getElementById("project-frame");


    if (!modal || !iframe) {
        return;
    }


    modal.classList.remove("active");


    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    iframe.src =
        "about:blank";


    document.body.style.overflow =
        "";

}