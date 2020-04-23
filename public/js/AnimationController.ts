export default class AnimationController {

    dropElement(element: HTMLElement, callback): void {
        const elementOriginalCords: Map<string, number> = new Map();
        elementOriginalCords.set('top', element.offsetTop);
        elementOriginalCords.set('left', element.offsetLeft - element.offsetWidth);

        element.animate({ transform: [`translate(${elementOriginalCords.get('left')}px, ${elementOriginalCords.get('top')}px)`, `translate(${elementOriginalCords.get('left') + 60}px, ${elementOriginalCords.get('left') + 1000}px)`] },
            { duration: 1300 });

        window.setTimeout(callback, 2000);
    }

}