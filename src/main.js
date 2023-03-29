import './main.scss';
import { slider } from './components/slider/slider';
import { calculator } from './components/calculator/calculator';
import { modalController } from './components/modal/modal';
import Inputmask from 'inputmask';
import JustValidate from 'just-validate';


calculator();
modalController();

const $phone = document.getElementById('phone');

const imPhone = new Inputmask('+7(999)999-99-99');
imPhone.mask($phone);

const validator = new JustValidate('.modal__form', {
    errorLabelCssClass: 'modal__input-error',
    errorLabelStyle:    {
        color: 'red',
    },
});

validator
    .addField('#name', [
        {
            rule:         'required',
            errorMessage: 'Введите имя',
        },
        {
            rule:         'minLength',
            value:        3,
            errorMessage: 'Не менее 3 символов',
        }
    ])
    .addField('#phone', [
        {
            rule:         'required',
            errorMessage: 'Введите телефон',
        },
        {
            validator: value => {
                const number = $phone?.inputmask?.unmaskedvalue();
                return number.length === 10;
            },
            errorMessage: 'Введите корректный телефон',
        }
    ]);

validator.onSuccess(event => {
    const $form = event.currentTarget;

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method:  'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            name:  $form.name.value,
            phone: $form.phone.value,
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            $form.reset();
            alert(`Спасибо! Мы с Вами свяжемся в ближайшее время. Номер заявки ${data.id}`);
        })
        .catch(error => console.error(error));
});
