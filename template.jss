

function generateSVG(code)
{
    parser.innerHTML = code;
    return parser.removeChild(parser.firstChild);
}


function isElement(elem)
{
    return elem instanceof Object && elem.querySelector;
}

export class SvgIcon
{

    get id()
    {
        return this.#item.id;
    }
    get namespace()
    {
        return this.#item.namespace;
    }
    get name()
    {
        return this.#item.name;
    }
    get code()
    {
        return this.#item.code;
    }
    get element()
    {
        return this.#elem ??= generateSVG(this.code);
    }
    setAttributes(attributes)
    {
        if (typeof attributes === 'object' && !Array.isArray(attributes) && attributes !== null)
        {
            const { element } = this;
            for (let attr in attributes)
            {
                element.setAttribute(attr, attributes[attr]);
            }
        }
    }
    detach()
    {
        this.element.remove();
    }
    isAttached()
    {
        return this.element.parentElement !== null;
    }
    attachTo(parent)
    {
        if (isElement(parent))
        {
            parent.appendChild(this.element);
        }
    }
    prependTo(parent)
    {
        if (isElement(parent))
        {
            parent.insertBefore(this.element, parent.firstElementChild);
        }
    }
    insertBefore(sibling)
    {
        if (isElement(sibling))
        {
            sibling.parentElement?.insertBefore(this.element, sibling);
        }
    }
    generate(parent)
    {
        const instance = new SvgIcon(this.#item);
        instance.attachTo(parent);
        return instance;
    }
    #elem;
    #item;
    constructor(item)
    {
        this.#item = item;
    }
}

