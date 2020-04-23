export default class AnimationController {

    dropElement(element: HTMLElement, coords: Array<number>, callback): void {
        element.animate({ transform: [`translate(${coords[0]}px, ${coords[1]}px)`, `translate(${coords[0]}px, ${coords[1] + 1000}px)`] },
            { duration: 1300 });

        window.setTimeout(callback, 1300);
    }

}