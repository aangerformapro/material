(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ngsprite = {}));
})(this, (function (exports) { 'use strict';

    /**
     * Material Design Custom SVG Sprite
     */
    const parser = document.createElement('div');
    parser.innerHTML = `<svg width="0" height="0" style="display: none;" id="ng-sprite"></svg>`;

    // generate the shadowroot
    const sprite = document.querySelector('#ng-sprite') ?? parser.removeChild(parser.firstChild);

    // all the icons that can be injected
    const icons = {"ng-contact":{"symbol":"<symbol id=\"ng-contact\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><rect xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" height=\"24\" width=\"24\"></rect>\n<path xmlns=\"http://www.w3.org/2000/svg\" d=\"M13.17,4L18,8.83V20H6V4H13.17 M14,2H6C4.9,2,4,2.9,4,4v16c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8L14,2L14,2z M12,14 c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2C10,13.1,10.9,14,12,14z M16,17.43c0-0.81-0.48-1.53-1.22-1.85 C13.93,15.21,12.99,15,12,15c-0.99,0-1.93,0.21-2.78,0.58C8.48,15.9,8,16.62,8,17.43V18h8V17.43z\"></path>\n</symbol>","xlink":"<svg fill=\"currentColor\" class=\"ng-svg-icon\"><use xlink:href=\"#ng-contact\"></use></svg>"},"ng-dashboard":{"symbol":"<symbol id=\"ng-dashboard\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 -960 960 960\"><path xmlns=\"http://www.w3.org/2000/svg\" d=\"M510-570v-270h330v270H510ZM120-450v-390h330v390H120Zm390 330v-390h330v390H510Zm-390 0v-270h330v270H120Zm60-390h210v-270H180v270Zm390 330h210v-270H570v270Zm0-450h210v-150H570v150ZM180-180h210v-150H180v150Zm210-330Zm180-120Zm0 180ZM390-330Z\"></path>\n</symbol>","xlink":"<svg fill=\"currentColor\" class=\"ng-svg-icon\"><use xlink:href=\"#ng-dashboard\"></use></svg>"},"ng-home":{"symbol":"<symbol id=\"ng-home\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path xmlns=\"http://www.w3.org/2000/svg\" d=\"M0 0h24v24H0z\" fill=\"none\"></path>\n<path xmlns=\"http://www.w3.org/2000/svg\" d=\"M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z\"></path>\n</symbol>","xlink":"<svg fill=\"currentColor\" class=\"ng-svg-icon\"><use xlink:href=\"#ng-home\"></use></svg>"},"ng-info":{"symbol":"<symbol id=\"ng-info\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 -960 960 960\"><path xmlns=\"http://www.w3.org/2000/svg\" d=\"M453-280h60v-240h-60v240Zm26.982-314q14.018 0 23.518-9.2T513-626q0-14.45-9.482-24.225-9.483-9.775-23.5-9.775-14.018 0-23.518 9.775T447-626q0 13.6 9.482 22.8 9.483 9.2 23.5 9.2Zm.284 514q-82.734 0-155.5-31.5t-127.266-86q-54.5-54.5-86-127.341Q80-397.681 80-480.5q0-82.819 31.5-155.659Q143-709 197.5-763t127.341-85.5Q397.681-880 480.5-880q82.819 0 155.659 31.5Q709-817 763-763t85.5 127Q880-563 880-480.266q0 82.734-31.5 155.5T763-197.684q-54 54.316-127 86Q563-80 480.266-80Zm.234-60Q622-140 721-239.5t99-241Q820-622 721.188-721 622.375-820 480-820q-141 0-240.5 98.812Q140-622.375 140-480q0 141 99.5 240.5t241 99.5Zm-.5-340Z\"></path>\n</symbol>","xlink":"<svg fill=\"currentColor\" class=\"ng-svg-icon\"><use xlink:href=\"#ng-info\"></use></svg>"},"ng-login":{"symbol":"<symbol id=\"ng-login\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path xmlns=\"http://www.w3.org/2000/svg\" d=\"M0 0h24v24H0z\" fill=\"none\"></path>\n<path xmlns=\"http://www.w3.org/2000/svg\" d=\"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z\"></path>\n</symbol>","xlink":"<svg fill=\"currentColor\" class=\"ng-svg-icon\"><use xlink:href=\"#ng-login\"></use></svg>"},"ng-logout":{"symbol":"<symbol id=\"ng-logout\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><g xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0,0h24v24H0V0z\" fill=\"none\"></path></g>\n<g xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M17,8l-1.41,1.41L17.17,11H9v2h8.17l-1.58,1.58L17,16l4-4L17,8z M5,5h7V3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h7v-2H5V5z\"></path></g>\n</symbol>","xlink":"<svg fill=\"currentColor\" class=\"ng-svg-icon\"><use xlink:href=\"#ng-logout\"></use></svg>"},"ng-menu":{"symbol":"<symbol id=\"ng-menu\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 -960 960 960\"><path xmlns=\"http://www.w3.org/2000/svg\" d=\"M120-240v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z\"></path>\n</symbol>","xlink":"<svg fill=\"currentColor\" class=\"ng-svg-icon\"><use xlink:href=\"#ng-menu\"></use></svg>"},"ng-reg":{"symbol":"<symbol id=\"ng-reg\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 -960 960 960\"><path xmlns=\"http://www.w3.org/2000/svg\" d=\"M80-160v-94q0-34 17-62.5t51-43.5q72-32 132-46t120-14q29 0 61.5 3.5T528-404l-49 49q-20-2-39.5-3.5T400-360q-58 0-105.5 10.5T172-306q-17 8-24.5 23t-7.5 29v34h319l60 60H80Zm545 16L484-285l42-42 99 99 213-213 42 42-255 255ZM400-482q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42Zm59 262Zm-59-322q39 0 64.5-25.5T490-632q0-39-25.5-64.5T400-722q-39 0-64.5 25.5T310-632q0 39 25.5 64.5T400-542Zm0-90Z\"></path>\n</symbol>","xlink":"<svg fill=\"currentColor\" class=\"ng-svg-icon\"><use xlink:href=\"#ng-reg\"></use></svg>"}};
    // inject the root element once
    let init = sprite.parentElement !== null;

    // generate xlink that can be used on the fly
    function generateSVG(code, size, color)
    {
        parser.innerHTML = code;
        const elem = parser.removeChild(parser.firstChild);
        if(size){
            elem.setAttribute('width', '' + size);
            elem.setAttribute('height', '' + size);
        }
        if(color) {
            elem.setAttribute('fill', color);
        }
        return elem;
    }


    function isElement(elem)
    {
        return !!(elem instanceof Object && elem.querySelector);
    }

    function loadSprite(id)
    {
        if (id && icons[id] && icons[id].symbol)
        {

            if (!init)
            {
                // inject shadowroot
                document.documentElement.appendChild(sprite);
            }

            if(!sprite.querySelector('#' + id)){
                // inject symbol
                sprite.innerHTML += icons[id].symbol;
            }

            delete icons[id].symbol;
        }
    }



    // Easy to inject icon class
    class Xlink
    {

        get id()
        {
            return this._id;
        }

        get template()
        {
            return icons[this.id].xlink;
        }


        appendTo(parent, size, color)
        {
            if (isElement(parent))
            {
                parent.appendChild(this.generate(size, color));
            }
        }
        prependTo(parent, size, color)
        {
            if (isElement(parent))
            {
                parent.insertBefore(this.generate(size, color), parent.firstElementChild);
            }
        }
        insertBefore(sibling, size, color)
        {
            if (isElement(sibling))
            {
                sibling.parentElement?.insertBefore(this.generate(size, color), sibling);
            }
        }

        generate(size, color)
        {
            loadSprite(this.id);
            return generateSVG(this.template, size, color);
        }

        constructor(id)
        {
            this._id = id;
        }

    }

    //render sprite (for ssr)
    function render(){
        return sprite.outerHTML;
    }



    function loadAll(){
        for(let id of Object.keys(icons)){
            loadSprite(id);
        }
    }


    // generate xlinks
    const ng_contact = new Xlink('ng-contact');
    const ng_dashboard = new Xlink('ng-dashboard');
    const ng_home = new Xlink('ng-home');
    const ng_info = new Xlink('ng-info');
    const ng_login = new Xlink('ng-login');
    const ng_logout = new Xlink('ng-logout');
    const ng_menu = new Xlink('ng-menu');
    const ng_reg = new Xlink('ng-reg');

    // creates naming map
    const names = [    ['ng-contact', 'ng_contact'],
        ['ng-dashboard', 'ng_dashboard'],
        ['ng-home', 'ng_home'],
        ['ng-info', 'ng_info'],
        ['ng-login', 'ng_login'],
        ['ng-logout', 'ng_logout'],
        ['ng-menu', 'ng_menu'],
        ['ng-reg', 'ng_reg'],
    ];

    // generate default export
    const svgs = {
        ng_contact,
        ng_dashboard,
        ng_home,
        ng_info,
        ng_login,
        ng_logout,
        ng_menu,
        ng_reg,
    };

    //watch dom for icons to add
    const
        selector = 'i[class^="ng-"]',
        nodes = new Set(),
        watcher = (elem) =>
        {
            return () =>
            {
                for (let target of [...elem.querySelectorAll(selector)])
                {

                    if (nodes.has(target))
                    {
                        continue;
                    }
                    nodes.add(target);

                    // creates the icon and remove the node
                    const
                        id = target.className.split(' ')[0],
                        [, name] = names.find(item => item[0] === id) ?? ['', ''];


                    if (name && svgs[name])
                    {
                        let size = target.getAttribute("size"), color = target.getAttribute("color");

                        svgs[name].insertBefore(target, size, color);
                    }

                    target.parentElement?.removeChild(target);
                }
            };
        };






    function watch(elem)
    {
        elem ??= document.body;
        const
            fn = watcher(elem),
            observer = new MutationObserver(fn);

        fn();
        observer.observe(elem, {
            attributes: true, childList: true, subtree: true
        });
        return () =>
        {
            observer.disconnect();
        };
    }


    const unwatch = watch();

    exports.default = svgs;
    exports.loadAll = loadAll;
    exports.ng_contact = ng_contact;
    exports.ng_dashboard = ng_dashboard;
    exports.ng_home = ng_home;
    exports.ng_info = ng_info;
    exports.ng_login = ng_login;
    exports.ng_logout = ng_logout;
    exports.ng_menu = ng_menu;
    exports.ng_reg = ng_reg;
    exports.render = render;
    exports.svgs = svgs;
    exports.unwatch = unwatch;
    exports.watch = watch;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
