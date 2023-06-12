function setupNavBar() {
    const dropdownToggles = document.getElementsByClassName("js-dropdown-toggle");
    const btnActiveClass = 'nav-global-btn-active';
    const isVisibleClass = 'is-visible';

    /* Hide all dropdowns. */
    function dropdownHideAll() {
        const dropdownMenus = document.getElementsByClassName("js-dropdown-menu");

        if (dropdownMenus) {
            for (let i = 0; i < dropdownMenus.length; i++) {
                dropdownMenus[i].classList.remove(isVisibleClass);
            }
        }

        /* Remove styling from all dropdown toggles. */
        for (let i = 0; i < dropdownToggles.length; i++) {
            dropdownToggles[i].classList.remove(btnActiveClass);
        }
    }

    for (let i = 0; i < dropdownToggles.length; i++) {
        dropdownToggles[i].addEventListener("click", function (e) {
            e.stopPropagation();

            const dropdownId = this.getAttribute('data-toggle-menu-id');
            const el = document.getElementById(dropdownId);

            if (el) {
                /* If the button is already active, remove styling. */
                if (el.classList.contains(isVisibleClass)) {
                    dropdownHideAll();
                } else {
                    /* Style button as active and show menu. */
                    this.classList.add(btnActiveClass);
                    el.classList.add(isVisibleClass);
                }
            }
        });
    }

    /* Hide all dropdowns when clicking anywhere except menus. */
    document.body.addEventListener("click", function (e) {
        if (!e.target.classList.contains("js-dropdown-menu")) {
            dropdownHideAll();
        }
    });

    /* Hide all dropdowns when pressing Esc. */
    window.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            dropdownHideAll();
        }
    });


    // Mark items as active
    if (location.pathname != null) {
        var items = [];
        items.push(...document.querySelectorAll('.nav-global nav>ul>li>a'));
        items.push(...document.querySelectorAll('.nav-global .nav-global-apps-menu ul>li>a'));
        for (var i = 0, len = items.length; i < len; i++) {
            var linkUrl = items[i].getAttribute("href");
            if (location.href.indexOf(linkUrl) !== -1) {
                items[i].className += "is-active";
            }
        }
    }
}

fetch('https://piperift.com/navbar/index.html')
    .then(function (response) {
        return response.text();
    })
    .then(function (html) {
        var container = document.getElementById('piperift-navbar');
        container.innerHTML = html;
        setupNavBar();
    })
    .catch(function (err) {
        console.log('Failed to fetch page: ', err);
    });