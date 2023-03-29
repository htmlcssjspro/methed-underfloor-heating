let scrollPosition;

const disableScroll = () => {
    const scrollBarWidth = window.innerWidth - document.body.offsetWidth;
    scrollPosition = window.scrollY;
    document.body.style.cssText = `
        position: fixed;
        top: -${scrollPosition}px;
        left: 0;
        height: 100vh;
        width: 100vw;
        padding-right: ${scrollBarWidth}px;
        overflow: hidden;
    `;
};

const enableScroll = () => {
    document.body.style.cssText = '';
    window.scroll({ top: scrollPosition, behavior: 'instant' });
};

export const modalController = (
    $modal = '.modal',
    {
        btnOpen = '.js-open-modal',
        btnClose = '.modal__close',
        time = 300,
    } = {}
) => {
    $modal = typeof $modal === 'string'
        ? document.querySelector($modal)
        : $modal;

    const btnOpenList = document.querySelectorAll(btnOpen);

    const closeModal = event => {
        if (
            event.target === event.currentTarget
            || event.target.closest(btnClose)
            || event.code === 'Escape'
            || event.key === 'Escape'
            || event.keyCode === 27
            || event.which === 27
        ) {
            $modal.classList.remove('open');
            $modal.classList.add('close');
            enableScroll();
            $modal.removeEventListener('click', closeModal, false);
            window.removeEventListener('keydown', closeModal, false);
        }
    };

    const openModal = event => {
        $modal.classList.remove('close');
        $modal.classList.add('open');
        disableScroll();
        $modal.addEventListener('click', closeModal, false);
        window.addEventListener('keydown', closeModal, false);
    };

    btnOpenList.forEach(btn => {
        btn.addEventListener('click', openModal, false);
    });
};
