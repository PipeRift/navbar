function setInnerHTML(elm, html) {
    elm.innerHTML = html;
    Array.from(elm.querySelectorAll("script"))
        .forEach(oldScriptEl => {
            const newScriptEl = document.createElement("script");

            Array.from(oldScriptEl.attributes).forEach(attr => {
                newScriptEl.setAttribute(attr.name, attr.value)
            });

            const scriptText = document.createTextNode(oldScriptEl.innerHTML);
            newScriptEl.appendChild(scriptText);

            oldScriptEl.parentNode.replaceChild(newScriptEl, oldScriptEl);
        });
}

function setupNavBar() {
    const dropdownToggles = document.getElementsByClassName("js-dropdown-toggle");
    const btnActiveClass = 'nav-global-btn-active';
    const isVisibleClass = 'is-visible';

    /* Hide all dropdowns. */
    function sropdownHideAll() {
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
                    sropdownHideAll();
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

    if (location.pathname != null) {
        var menuItems = document.querySelectorAll('.nav-global nav>ul>li>a');
        for (var i = 0, len = menuItems.length; i < len; i++) {
            if (location.pathname.indexOf(menuItems[i].getAttribute("href")) !== -1) {
                menuItems[i].className += "is-active";
            }
        }
    }
}

fetch('./navbar/index.html')
    .then(function (response) {
        return response.text();
    })
    .then(function (html) {
        var node = document.getElementById('piperift-navbar').parentNode;
        //setInnerHTML(node, html);
        node.innerHTML = html;
        setupNavBar()
    })
    .catch(function (err) {
        console.log('Failed to fetch page: ', err);
    });