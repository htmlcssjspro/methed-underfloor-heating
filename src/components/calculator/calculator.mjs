const $form = document.getElementById('js-calc-form');
const $square = document.getElementById('js-calc-square');
const $price = document.getElementById('js-calc-price');

export const calculator = () => {
    $form.addEventListener('submit', event => {
        event.preventDefault();
        const currentTarget = event.currentTarget;
        const target = event.target;

        const width = currentTarget.width.value;
        const length = currentTarget.length.value;
        const tariffPrice = currentTarget.querySelector('input[name=tariff]:checked').dataset.price;

        const square = width * length;
        const price = square * tariffPrice;

        $square.innerHTML = `${square}&nbsp;кв&nbsp;м`;
        $price.innerHTML = `${price}&nbsp;руб`;
    });
};
