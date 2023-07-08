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
    const icons = {"ng-equals":{"symbol":"<symbol id=\"ng-equals\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><g xmlns=\"http://www.w3.org/2000/svg\"><rect fill=\"none\" height=\"24\" width=\"24\"></rect></g>\n<g xmlns=\"http://www.w3.org/2000/svg\"><g><polygon points=\"6.41,6 5,7.41 9.58,12 5,16.59 6.41,18 12.41,12\"></polygon><polygon points=\"13,6 11.59,7.41 16.17,12 11.59,16.59 13,18 19,12\"></polygon></g></g>\n</symbol>","xlink":"<svg fill=\"currentColor\" class=\"ng-svg-icon\"><use xlink:href=\"#ng-equals\"></use></svg>"},"ng-gold":{"symbol":"<symbol id=\"ng-gold\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><g xmlns=\"http://www.w3.org/2000/svg\"><rect fill=\"none\" height=\"24\" width=\"24\"></rect></g>\n<g xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12.88,17.76V19h-1.75v-1.29 c-0.74-0.18-2.39-0.77-3.02-2.96l1.65-0.67c0.06,0.22,0.58,2.09,2.4,2.09c0.93,0,1.98-0.48,1.98-1.61c0-0.96-0.7-1.46-2.28-2.03 c-1.1-0.39-3.35-1.03-3.35-3.31c0-0.1,0.01-2.4,2.62-2.96V5h1.75v1.24c1.84,0.32,2.51,1.79,2.66,2.23l-1.58,0.67 c-0.11-0.35-0.59-1.34-1.9-1.34c-0.7,0-1.81,0.37-1.81,1.39c0,0.95,0.86,1.31,2.64,1.9c2.4,0.83,3.01,2.05,3.01,3.45 C15.9,17.17,13.4,17.67,12.88,17.76z\"></path></g>\n</symbol>","xlink":"<svg fill=\"currentColor\" class=\"ng-svg-icon\"><use xlink:href=\"#ng-gold\"></use></svg>"},"ng-heart":{"symbol":"<symbol id=\"ng-heart\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path xmlns=\"http://www.w3.org/2000/svg\" d=\"M0 0h24v24H0z\" fill=\"none\"></path>\n<path xmlns=\"http://www.w3.org/2000/svg\" d=\"M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z\"></path>\n</symbol>","xlink":"<svg fill=\"currentColor\" class=\"ng-svg-icon\"><use xlink:href=\"#ng-heart\"></use></svg>"},"ng-level":{"symbol":"<symbol id=\"ng-level\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><g xmlns=\"http://www.w3.org/2000/svg\"><rect fill=\"none\" height=\"24\" width=\"24\" x=\"0\"></rect><g><g><path d=\"M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M18,8h-2.42v3.33H13v3.33h-2.58 V18H6v-2h2.42v-3.33H11V9.33h2.58V6H18V8z\"></path></g></g></g>\n</symbol>","xlink":"<svg fill=\"currentColor\" class=\"ng-svg-icon\"><use xlink:href=\"#ng-level\"></use></svg>"},"ng-minus":{"symbol":"<symbol id=\"ng-minus\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path xmlns=\"http://www.w3.org/2000/svg\" d=\"M0 0h24v24H0z\" fill=\"none\"></path>\n<path xmlns=\"http://www.w3.org/2000/svg\" d=\"M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z\"></path>\n</symbol>","xlink":"<svg fill=\"currentColor\" class=\"ng-svg-icon\"><use xlink:href=\"#ng-minus\"></use></svg>"},"ng-pause":{"symbol":"<symbol id=\"ng-pause\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><g xmlns=\"http://www.w3.org/2000/svg\"><rect fill=\"none\" height=\"24\" width=\"24\"></rect></g>\n<g xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M11,16H9V8h2V16z M15,16h-2V8h2V16z\"></path></g></g>\n</symbol>","xlink":"<svg fill=\"currentColor\" class=\"ng-svg-icon\"><use xlink:href=\"#ng-pause\"></use></svg>"},"ng-play":{"symbol":"<symbol id=\"ng-play\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><g xmlns=\"http://www.w3.org/2000/svg\"><rect fill=\"none\" height=\"24\" width=\"24\"></rect></g>\n<g xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M9.5,16.5v-9l7,4.5L9.5,16.5z\"></path></g>\n</symbol>","xlink":"<svg fill=\"currentColor\" class=\"ng-svg-icon\"><use xlink:href=\"#ng-play\"></use></svg>"},"ng-plus":{"symbol":"<symbol id=\"ng-plus\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path xmlns=\"http://www.w3.org/2000/svg\" d=\"M0 0h24v24H0z\" fill=\"none\"></path>\n<path xmlns=\"http://www.w3.org/2000/svg\" d=\"M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z\"></path>\n</symbol>","xlink":"<svg fill=\"currentColor\" class=\"ng-svg-icon\"><use xlink:href=\"#ng-plus\"></use></svg>"},"ng-skull":{"symbol":"<symbol id=\"ng-skull\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path xmlns=\"http://www.w3.org/2000/svg\" d=\"M416 398.9c58.5-41.1 96-104.1 96-174.9C512 100.3 397.4 0 256 0S0 100.3 0 224c0 70.7 37.5 133.8 96 174.9c0 .4 0 .7 0 1.1v64c0 26.5 21.5 48 48 48h48V464c0-8.8 7.2-16 16-16s16 7.2 16 16v48h64V464c0-8.8 7.2-16 16-16s16 7.2 16 16v48h48c26.5 0 48-21.5 48-48V400c0-.4 0-.7 0-1.1zM96 256a64 64 0 1 1 128 0A64 64 0 1 1 96 256zm256-64a64 64 0 1 1 0 128 64 64 0 1 1 0-128z\"></path>\n</symbol>","xlink":"<svg fill=\"currentColor\" class=\"ng-svg-icon\"><use xlink:href=\"#ng-skull\"></use></svg>"},"ng-timer":{"symbol":"<symbol id=\"ng-timer\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><g xmlns=\"http://www.w3.org/2000/svg\"><rect fill=\"none\" height=\"24\" width=\"24\"></rect></g>\n<g xmlns=\"http://www.w3.org/2000/svg\"><g><g><path d=\"M15,1H9v2h6V1z M11,14h2V8h-2V14z M19.03,7.39l1.42-1.42c-0.43-0.51-0.9-0.99-1.41-1.41l-1.42,1.42 C16.07,4.74,14.12,4,12,4c-4.97,0-9,4.03-9,9s4.02,9,9,9s9-4.03,9-9C21,10.88,20.26,8.93,19.03,7.39z M12,20c-3.87,0-7-3.13-7-7 s3.13-7,7-7s7,3.13,7,7S15.87,20,12,20z\"></path></g></g></g>\n</symbol>","xlink":"<svg fill=\"currentColor\" class=\"ng-svg-icon\"><use xlink:href=\"#ng-timer\"></use></svg>"}};
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
    const ng_equals = new Xlink('ng-equals');
    const ng_gold = new Xlink('ng-gold');
    const ng_heart = new Xlink('ng-heart');
    const ng_level = new Xlink('ng-level');
    const ng_minus = new Xlink('ng-minus');
    const ng_pause = new Xlink('ng-pause');
    const ng_play = new Xlink('ng-play');
    const ng_plus = new Xlink('ng-plus');
    const ng_skull = new Xlink('ng-skull');
    const ng_timer = new Xlink('ng-timer');

    // creates naming map
    const names = [    ['ng-equals', 'ng_equals'],
        ['ng-gold', 'ng_gold'],
        ['ng-heart', 'ng_heart'],
        ['ng-level', 'ng_level'],
        ['ng-minus', 'ng_minus'],
        ['ng-pause', 'ng_pause'],
        ['ng-play', 'ng_play'],
        ['ng-plus', 'ng_plus'],
        ['ng-skull', 'ng_skull'],
        ['ng-timer', 'ng_timer'],
    ];

    // generate default export
    const svgs = {
        ng_equals,
        ng_gold,
        ng_heart,
        ng_level,
        ng_minus,
        ng_pause,
        ng_play,
        ng_plus,
        ng_skull,
        ng_timer,
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
    exports.ng_equals = ng_equals;
    exports.ng_gold = ng_gold;
    exports.ng_heart = ng_heart;
    exports.ng_level = ng_level;
    exports.ng_minus = ng_minus;
    exports.ng_pause = ng_pause;
    exports.ng_play = ng_play;
    exports.ng_plus = ng_plus;
    exports.ng_skull = ng_skull;
    exports.ng_timer = ng_timer;
    exports.render = render;
    exports.svgs = svgs;
    exports.unwatch = unwatch;
    exports.watch = watch;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
